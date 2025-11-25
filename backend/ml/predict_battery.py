"""Placeholder predictor for DC battery banks."""

from __future__ import annotations

from fetch_firebase import fetch_asset_metadata, fetch_realtime
from predict_shared import build_placeholder_response
from utils_preprocess import merge_inputs

COMPONENT_KEY = "battery"


def predict(area_code: str, substation_id: str):
    live_root = fetch_realtime(area_code, substation_id)
    live = (live_root or {}).get("battery", {})
    asset = fetch_asset_metadata(substation_id)

    merged = merge_inputs(live, asset)
    return build_placeholder_response(COMPONENT_KEY, merged["live"], asset)

