import type { ReactNode } from "react"
import { CourseWrapper } from "@/components/course/course-wrapper"

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return <CourseWrapper>{children}</CourseWrapper>
}

