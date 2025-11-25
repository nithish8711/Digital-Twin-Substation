"""
CLI wrapper that dispatches to component-specific predictor modules.

Usage:
    python run_predictor.py --component transformer --area CHN001 --substation CHN-482153

The script prints JSON to stdout so that Node/Next API routes can consume it.
"""

from __future__ import annotations

import argparse
import importlib
import json
import sys
from typing import Any, Dict


COMPONENT_MODULES = {
    "bayLines": "predict_bayline",
    "transformer": "predict_transformer",
    "circuitBreaker": "predict_breaker",
    "busbar": "predict_busbar",
    "isolator": "predict_isolator",
    "relay": "predict_relay",
    "pmu": "predict_pmu",
    "gis": "predict_gis",
    "battery": "predict_battery",
    "environment": "predict_environment",
}


def _load_predictor(component: str):
    module_name = COMPONENT_MODULES.get(component)
    if not module_name:
        raise ValueError(f"Unsupported component '{component}'")
    module = importlib.import_module(module_name)
    if not hasattr(module, "predict"):
        raise AttributeError(f"Module {module_name} missing predict()")
    return module.predict


def main(argv: Any = None) -> int:
    parser = argparse.ArgumentParser(description="Diagnosis predictor dispatcher")
    parser.add_argument("--component", required=True, help="Component key, e.g. transformer")
    parser.add_argument("--area", required=True, help="Area code / realtime root key")
    parser.add_argument("--substation", required=True, help="Substation ID")

    args = parser.parse_args(argv)

    predictor = _load_predictor(args.component)
    try:
        result: Dict[str, Any] = predictor(args.area, args.substation)
    except Exception as exc:  # pragma: no cover - used for human-readable errors
        print(json.dumps({"error": str(exc), "component": args.component}), file=sys.stderr)
        raise

    print(json.dumps(result))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

