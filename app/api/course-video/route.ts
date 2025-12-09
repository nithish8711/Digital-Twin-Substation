"use server"

import { NextResponse } from "next/server"
import { Binary, ObjectId } from "mongodb"
import { getMongoDb, getCourseVideoBucket } from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const componentId = searchParams.get("componentId")
    const videoType = searchParams.get("videoType")

    if (!componentId) {
      return NextResponse.json({ error: "Missing componentId" }, { status: 400 })
    }

    const db = await getMongoDb()
    
    // Try multiple collection name variations (case sensitivity)
    // Start with "Digitaltwin" (capital D) since that's what exists according to logs
    const collectionNames = ["Digitaltwin", "digitaltwin", "DigitalTwin"]
    let doc: any = null
    let usedCollection = ""
    
    // Filter by componentType and optionally videoType
    // Make componentType case-insensitive by converting to lowercase
    const filter: Record<string, unknown> = { componentType: componentId.toLowerCase() }
    if (videoType) {
      filter.videoType = videoType
    }
    
    console.log("[Course Video API] Searching for video", {
      componentId,
      videoType,
      filter,
      databaseName: db.databaseName,
    })
    
    // Try each collection name variation
    for (const collectionName of collectionNames) {
      try {
        const collection = db.collection(collectionName)
        
        // First, check if collection exists and has documents
        const count = await collection.countDocuments({})
        console.log(`[Course Video API] Collection "${collectionName}" has ${count} documents`)
        
        if (count === 0) {
          continue // Skip empty collections
        }
        
        // Try to find the document with exact match
        doc = await collection.findOne(filter, { sort: { createdAt: -1 } })
        
        if (doc) {
          usedCollection = collectionName
          console.log(`[Course Video API] Found document in collection "${collectionName}"`, {
            _id: doc._id,
            componentType: doc.componentType,
            videoType: doc.videoType,
            hasData: !!doc.data,
            hasGridfsFileId: !!doc.gridfsFileId,
            mimeType: doc.mimeType,
          })
          break
        } else {
          // Try without videoType filter if videoType was provided
          if (videoType) {
            const filterWithoutVideoType = { componentType: componentId.toLowerCase() }
            doc = await collection.findOne(filterWithoutVideoType, { sort: { createdAt: -1 } })
            if (doc) {
              usedCollection = collectionName
              console.log(`[Course Video API] Found document without videoType filter in "${collectionName}"`, {
                _id: doc._id,
                componentType: doc.componentType,
                videoType: doc.videoType,
              })
              break
            }
          }
          
          // Log what documents exist for debugging
          const sampleDocs = await collection.find({}).limit(5).toArray()
          console.log(`[Course Video API] No match in "${collectionName}". Sample documents:`, 
            sampleDocs.map(d => ({
              _id: d._id,
              componentType: d.componentType,
              videoType: d.videoType,
              hasData: !!d.data,
              hasGridfsFileId: !!d.gridfsFileId,
            }))
          )
        }
      } catch (err) {
        console.error(`[Course Video API] Error accessing collection "${collectionName}":`, err)
      }
    }
    
    // If still not found, try listing all collections
    if (!doc) {
      try {
        const collections = await db.listCollections().toArray()
        console.log("[Course Video API] Available collections:", collections.map(c => c.name))
      } catch (err) {
        console.error("[Course Video API] Error listing collections:", err)
      }
    }

    if (!doc) {
      console.error("[Course Video API] Video not found", {
        componentId,
        filter,
        triedCollections: collectionNames,
      })
      return NextResponse.json({ 
        error: "Video not found", 
        details: `No video found for componentId: ${componentId}` 
      }, { status: 404 })
    }

    const mimeType = (doc as any).mimeType || "video/webm"
    
    // Check if video is stored in GridFS
    const gridfsFileId = (doc as any).gridfsFileId
    if (gridfsFileId) {
      console.log("[Course Video API] Video stored in GridFS", { gridfsFileId })
      
      try {
        const bucket = await getCourseVideoBucket()
        const fileId = new ObjectId(gridfsFileId)
        
        // Check if file exists in GridFS
        const files = await bucket.find({ _id: fileId }).toArray()
        if (files.length === 0) {
          console.error("[Course Video API] GridFS file not found", {
            gridfsFileId,
            fileId: fileId.toString(),
            bucketName: "courseVideos",
          })
          
          // Try to find file by filename as fallback
          const gridfsFileName = (doc as any).gridfsFileName
          if (gridfsFileName) {
            const filesByName = await bucket.find({ filename: gridfsFileName }).toArray()
            console.log("[Course Video API] Searching by filename", {
              gridfsFileName,
              foundFiles: filesByName.length,
            })
            
            if (filesByName.length > 0) {
              // Use the found file
              const foundFile = filesByName[0]
              console.log("[Course Video API] Found file by filename, updating document", {
                oldId: gridfsFileId,
                newId: foundFile._id.toString(),
              })
              
              // Update the document with correct ID
              const collection = db.collection(usedCollection)
              await collection.updateOne(
                { _id: doc._id },
                { $set: { gridfsFileId: foundFile._id.toString() } }
              )
              
              // Use the found file ID
              const downloadStream = bucket.openDownloadStream(foundFile._id)
              
              // Convert stream to buffer for range request support
              const chunks: Buffer[] = []
              for await (const chunk of downloadStream) {
                chunks.push(chunk)
              }
              const buffer = Buffer.concat(chunks)
              
              // Handle range requests
              const range = request.headers.get("range")
              if (range) {
                const parts = range.replace(/bytes=/, "").split("-")
                const start = parseInt(parts[0], 10)
                const end = parts[1] ? parseInt(parts[1], 10) : buffer.length - 1
                const chunkSize = end - start + 1
                const chunk = buffer.slice(start, end + 1)

                return new NextResponse(chunk, {
                  status: 206,
                  headers: {
                    "Content-Range": `bytes ${start}-${end}/${buffer.length}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunkSize.toString(),
                    "Content-Type": mimeType,
                    "Cache-Control": "public, max-age=3600",
                  },
                })
              }

              return new NextResponse(buffer, {
                status: 200,
                headers: {
                  "Content-Type": mimeType,
                  "Content-Length": buffer.length.toString(),
                  "Accept-Ranges": "bytes",
                  "Cache-Control": "public, max-age=3600",
                },
              })
            }
          }
          
          // File doesn't exist, return error
          return NextResponse.json(
            { 
              error: "Video file not found in GridFS", 
              details: `GridFS file with ID ${gridfsFileId} does not exist. The file may have been deleted or never uploaded successfully.`,
              gridfsFileId,
            },
            { status: 404 }
          )
        }
        
        // File exists, download it
        const downloadStream = bucket.openDownloadStream(fileId)
        
        // Convert stream to buffer for range request support
        const chunks: Buffer[] = []
        for await (const chunk of downloadStream) {
          chunks.push(chunk)
        }
        const buffer = Buffer.concat(chunks)
        
        // Handle range requests for video streaming
        const range = request.headers.get("range")
        if (range) {
          const parts = range.replace(/bytes=/, "").split("-")
          const start = parseInt(parts[0], 10)
          const end = parts[1] ? parseInt(parts[1], 10) : buffer.length - 1
          const chunkSize = end - start + 1
          const chunk = buffer.slice(start, end + 1)

          return new NextResponse(chunk, {
            status: 206,
            headers: {
              "Content-Range": `bytes ${start}-${end}/${buffer.length}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunkSize.toString(),
              "Content-Type": mimeType,
              "Cache-Control": "public, max-age=3600",
            },
          })
        }

        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": mimeType,
            "Content-Length": buffer.length.toString(),
            "Accept-Ranges": "bytes",
            "Cache-Control": "public, max-age=3600",
          },
        })
      } catch (gridfsError) {
        console.error("[Course Video API] Error reading from GridFS:", gridfsError)
        
        // If file not found, try to find by metadata
        if (gridfsError instanceof Error && gridfsError.message.includes("FileNotFound")) {
          console.log("[Course Video API] FileNotFound error, trying to find by metadata")
          
          try {
            const bucket = await getCourseVideoBucket()
            const files = await bucket
              .find({
                "metadata.componentType": componentId.toLowerCase(),
                "metadata.videoType": videoType,
              })
              .sort({ uploadDate: -1 })
              .limit(1)
              .toArray()
            
            if (files.length > 0) {
              const foundFile = files[0]
              console.log("[Course Video API] Found file by metadata, updating document", {
                oldId: gridfsFileId,
                newId: foundFile._id.toString(),
              })
              
              // Update the document with correct ID
              const collection = db.collection(usedCollection)
              await collection.updateOne(
                { _id: doc._id },
                { $set: { gridfsFileId: foundFile._id.toString(), gridfsFileName: foundFile.filename } }
              )
              
              // Retry download with correct ID
              const downloadStream = bucket.openDownloadStream(foundFile._id)
              const chunks: Buffer[] = []
              for await (const chunk of downloadStream) {
                chunks.push(chunk)
              }
              const buffer = Buffer.concat(chunks)
              
              // Handle range requests
              const range = request.headers.get("range")
              if (range) {
                const parts = range.replace(/bytes=/, "").split("-")
                const start = parseInt(parts[0], 10)
                const end = parts[1] ? parseInt(parts[1], 10) : buffer.length - 1
                const chunkSize = end - start + 1
                const chunk = buffer.slice(start, end + 1)

                return new NextResponse(chunk, {
                  status: 206,
                  headers: {
                    "Content-Range": `bytes ${start}-${end}/${buffer.length}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunkSize.toString(),
                    "Content-Type": mimeType,
                    "Cache-Control": "public, max-age=3600",
                  },
                })
              }

              return new NextResponse(buffer, {
                status: 200,
                headers: {
                  "Content-Type": mimeType,
                  "Content-Length": buffer.length.toString(),
                  "Accept-Ranges": "bytes",
                  "Cache-Control": "public, max-age=3600",
                },
              })
            }
          } catch (fallbackError) {
            console.error("[Course Video API] Fallback search also failed:", fallbackError)
          }
        }
        
        return NextResponse.json(
          { 
            error: "Failed to read video from GridFS", 
            details: gridfsError instanceof Error ? gridfsError.message : String(gridfsError),
            suggestion: "The GridFS file may have been deleted or the ID is incorrect. Please re-upload the video.",
          },
          { status: 500 }
        )
      }
    }
    
    // Regular document storage
    const data = (doc as any).data
    let buffer: Buffer | null = null

    console.log("[Course Video API] Processing video data", {
      componentId,
      mimeType,
      dataType: typeof data,
      isBinary: data instanceof Binary,
      hasBuffer: !!data?.buffer,
      isBuffer: Buffer.isBuffer(data),
    })

    // Handle MongoDB Binary data properly
    if (data instanceof Binary) {
      try {
        // MongoDB Binary object - the buffer property should contain the actual data
        const binaryBuffer = data.buffer
        
        if (Buffer.isBuffer(binaryBuffer)) {
          buffer = binaryBuffer
        } else if (binaryBuffer instanceof Uint8Array) {
          buffer = Buffer.from(binaryBuffer)
        } else if (binaryBuffer instanceof ArrayBuffer) {
          buffer = Buffer.from(binaryBuffer)
        } else if (binaryBuffer && typeof binaryBuffer === 'object') {
          // Try accessing nested buffer
          if (binaryBuffer.buffer instanceof ArrayBuffer) {
            buffer = Buffer.from(binaryBuffer.buffer)
          } else if (Buffer.isBuffer(binaryBuffer)) {
            buffer = binaryBuffer
          }
        }
        
        // Fallback: Read byte by byte if buffer access didn't work
        if (!buffer && data.length() > 0) {
          try {
            const length = data.length()
            const uint8Array = new Uint8Array(length)
            for (let i = 0; i < length; i++) {
              uint8Array[i] = data.readUInt8(i)
            }
            buffer = Buffer.from(uint8Array)
            console.log("[Course Video API] Extracted buffer using byte-by-byte read", { length: buffer.length })
          } catch (readErr) {
            console.error("[Course Video API] Failed to read Binary byte-by-byte:", readErr)
          }
        }
      } catch (err) {
        console.error("[Course Video API] Error extracting Binary data:", err)
      }
    } else if (Buffer.isBuffer(data)) {
      buffer = data
    } else if (data instanceof Uint8Array) {
      buffer = Buffer.from(data)
    } else if (data?.buffer) {
      if (Buffer.isBuffer(data.buffer)) {
        buffer = data.buffer
      } else if (data.buffer instanceof ArrayBuffer || data.buffer instanceof Uint8Array) {
        buffer = Buffer.from(data.buffer)
      }
    } else if (typeof data === 'string') {
      // If it's a base64 string
      buffer = Buffer.from(data, 'base64')
    }

    if (!buffer || buffer.length === 0) {
      console.error("[Course Video API] Failed to convert video data to buffer", {
        dataType: typeof data,
        isBinary: data instanceof Binary,
        hasBuffer: !!data?.buffer,
        isBuffer: Buffer.isBuffer(data),
        dataKeys: data && typeof data === 'object' ? Object.keys(data) : null,
        binaryLength: data instanceof Binary ? data.length() : null,
      })
      return NextResponse.json({ error: "Invalid video data - unable to extract buffer" }, { status: 500 })
    }

    console.log("[Course Video API] Successfully extracted buffer", {
      bufferLength: buffer.length,
      mimeType,
    })

    // Handle range requests for video streaming
    const range = request.headers.get("range")
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : buffer.length - 1
      const chunkSize = end - start + 1
      const chunk = buffer.slice(start, end + 1)

      return new NextResponse(chunk, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${buffer.length}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Content-Type": mimeType,
          "Cache-Control": "public, max-age=3600",
        },
      })
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Length": buffer.length.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Error fetching course video:", error)
    return NextResponse.json(
      { error: "Failed to fetch video", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const componentType = formData.get("componentType") as string | null
    const videoType = formData.get("videoType") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!componentType) {
      return NextResponse.json({ error: "componentType is required" }, { status: 400 })
    }

    if (!videoType) {
      return NextResponse.json({ error: "videoType is required" }, { status: 400 })
    }

    // Validate video type
    const validVideoTypes = ["workingPrinciple", "operation", "faults", "safety"]
    if (!validVideoTypes.includes(videoType)) {
      return NextResponse.json(
        { error: `Invalid videoType. Must be one of: ${validVideoTypes.join(", ")}` },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith("video/")) {
      return NextResponse.json({ error: "File must be a video" }, { status: 400 })
    }

    // MongoDB document size limit is 16MB
    // For files larger than 15MB, we'll use GridFS
    const MAX_DOCUMENT_SIZE = 15 * 1024 * 1024 // 15MB
    const useGridFS = file.size > MAX_DOCUMENT_SIZE

    console.log("[Course Video API] Uploading video", {
      componentType,
      videoType,
      fileName: file.name,
      fileSize: file.size,
      fileSizeMB: (file.size / 1024 / 1024).toFixed(2),
      mimeType: file.type,
    })

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    console.log("[Course Video API] File converted", {
      arrayBufferSize: arrayBuffer.byteLength,
      bufferSize: buffer.length,
      fileSize: file.size,
      useGridFS,
    })

    const db = await getMongoDb()
    
    if (useGridFS) {
      // Use GridFS for large files
      console.log("[Course Video API] Using GridFS for large file")
      
      const bucket = await getCourseVideoBucket()
      const fileId = new ObjectId()
      const fileName = `${componentType.toLowerCase()}_${videoType}_${fileId.toString()}`
      
      // Remove any existing video for this componentType and videoType combination
      const existingFiles = await bucket
        .find({
          "metadata.componentType": componentType.toLowerCase(),
          "metadata.videoType": videoType,
        })
        .toArray()
      
      for (const existingFile of existingFiles) {
        if (existingFile._id) {
          await bucket.delete(existingFile._id)
        }
      }
      
      // Upload to GridFS
      const uploadStream = bucket.openUploadStream(fileName, {
        _id: fileId,
        contentType: file.type,
        metadata: {
          componentType: componentType.toLowerCase(),
          videoType: videoType,
          originalFileName: file.name,
        },
      })
      
      // Store the actual file ID from the stream
      let actualFileId = fileId
      
      await new Promise<void>((resolve, reject) => {
        uploadStream.on("error", (err) => {
          console.error("[Course Video API] GridFS upload error:", err)
          reject(err)
        })
        uploadStream.on("finish", () => {
          // Use the stream's ID if available (should match fileId)
          actualFileId = uploadStream.id as ObjectId
          console.log("[Course Video API] GridFS upload finished", {
            fileId: fileId.toString(),
            actualFileId: actualFileId.toString(),
            fileName,
          })
          resolve()
        })
        uploadStream.end(buffer)
      })
      
      // Verify file was uploaded with retry mechanism (GridFS may need a moment to commit)
      let verifyFiles: any[] = []
      let retries = 3
      while (retries > 0 && verifyFiles.length === 0) {
        verifyFiles = await bucket.find({ _id: actualFileId }).toArray()
        if (verifyFiles.length === 0) {
          retries--
          if (retries > 0) {
            console.log(`[Course Video API] File not found yet, retrying... (${retries} retries left)`)
            await new Promise(resolve => setTimeout(resolve, 500)) // Wait 500ms
          }
        }
      }
      
      if (verifyFiles.length === 0) {
        // Try finding by metadata as fallback
        const filesByMetadata = await bucket
          .find({
            "metadata.componentType": componentType.toLowerCase(),
            "metadata.videoType": videoType,
            filename: fileName,
          })
          .sort({ uploadDate: -1 })
          .limit(1)
          .toArray()
        
        if (filesByMetadata.length > 0) {
          actualFileId = filesByMetadata[0]._id
          verifyFiles = filesByMetadata
          console.log("[Course Video API] Found file by metadata instead", {
            fileId: actualFileId.toString(),
          })
        } else {
          console.error("[Course Video API] File not found after upload", {
            expectedFileId: fileId.toString(),
            actualFileId: actualFileId.toString(),
            fileName,
          })
          // Continue anyway - the file might still be there, just not immediately queryable
          // We'll use the fileId we have
        }
      }
      
      if (verifyFiles.length > 0) {
        console.log("[Course Video API] Verified GridFS file exists", {
          fileId: actualFileId.toString(),
          fileSize: verifyFiles[0].length,
        })
      } else {
        console.warn("[Course Video API] Could not verify file, but upload completed successfully", {
          fileId: actualFileId.toString(),
        })
      }
      
      // Also store a reference in the Digitaltwin collection for easy lookup
      const collectionNames = ["Digitaltwin", "digitaltwin", "DigitalTwin"]
      let collection = db.collection(collectionNames[0])
      
      await collection.deleteMany({
        componentType: componentType.toLowerCase(),
        videoType: videoType,
      })
      
      const insertResult = await collection.insertOne({
        componentType: componentType.toLowerCase(),
        videoType: videoType,
        mimeType: file.type,
        gridfsFileId: actualFileId.toString(),
        gridfsFileName: fileName,
        createdAt: new Date(),
      })
      
      console.log("[Course Video API] Video uploaded to GridFS successfully", {
        fileId: actualFileId.toString(),
        fileName,
        documentId: insertResult.insertedId.toString(),
      })
      
      return NextResponse.json(
        {
          success: true,
          message: "Video uploaded successfully (GridFS)",
          id: actualFileId.toString(),
          componentType: componentType.toLowerCase(),
          videoType: videoType,
          storageType: "gridfs",
        },
        { status: 200 }
      )
    } else {
      // Use regular document storage for smaller files
      console.log("[Course Video API] Using document storage for small file")
      
      // Convert buffer to Uint8Array for MongoDB Binary
      const uint8Array = new Uint8Array(arrayBuffer)
      
      // Create MongoDB Binary with proper subtype (0 = generic binary)
      const binaryData = new Binary(uint8Array, 0)
      
      console.log("[Course Video API] Binary object created", {
        binaryLength: binaryData.length(),
      })
      
      // Try multiple collection name variations
      const collectionNames = ["Digitaltwin", "digitaltwin", "DigitalTwin"]
      let collection: any = null
      let usedCollection = ""
      
      for (const collectionName of collectionNames) {
        try {
          const testCollection = db.collection(collectionName)
          await testCollection.countDocuments({})
          collection = testCollection
          usedCollection = collectionName
          console.log(`[Course Video API] Using collection "${collectionName}"`)
          break
        } catch (err) {
          continue
        }
      }

      if (!collection) {
        collection = db.collection(collectionNames[0])
        usedCollection = collectionNames[0]
        console.log(`[Course Video API] Creating/using collection "${usedCollection}"`)
      }

      // Remove any existing video for this componentType and videoType combination
      await collection.deleteMany({
        componentType: componentType.toLowerCase(),
        videoType: videoType,
      })

      // Insert new video document
      const result = await collection.insertOne({
        componentType: componentType.toLowerCase(),
        videoType: videoType,
        mimeType: file.type,
        data: binaryData,
        createdAt: new Date(),
      })

      console.log("[Course Video API] Video uploaded successfully", {
        insertedId: result.insertedId,
        collection: usedCollection,
      })

      return NextResponse.json(
        {
          success: true,
          message: "Video uploaded successfully",
          id: result.insertedId.toString(),
          componentType: componentType.toLowerCase(),
          videoType: videoType,
          storageType: "document",
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error("[Course Video API] Error uploading video:", error)
    return NextResponse.json(
      {
        error: "Failed to upload video",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

