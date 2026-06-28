"""
Model loading and inference utilities.

If a trained .h5 model file exists at MODEL_PATH, the real Keras model is used.
Otherwise, the server runs in demo mode with simulated predictions.
"""

import os
import random
import logging

import numpy as np
from PIL import Image
from io import BytesIO

from config import MODEL_PATH, IMAGE_SIZE, NUM_CLASSES, CLASS_NAMES

logger = logging.getLogger("uvicorn.error")

# ─── State ─────────────────────────────────────────────────────────────────────
_model = None
_demo_mode = True


def load_model() -> None:
    """
    Attempt to load the trained Keras model from disk.
    Falls back to demo mode if the file is missing or TensorFlow is unavailable.
    """
    global _model, _demo_mode

    if not os.path.exists(MODEL_PATH):
        logger.warning(
            f"Model file not found at '{MODEL_PATH}'. "
            "Starting in DEMO mode — predictions will be simulated."
        )
        _demo_mode = True
        return

    try:
        import tensorflow as tf

        _model = tf.keras.models.load_model(MODEL_PATH)
        _demo_mode = False
        logger.info(f"Model loaded successfully from '{MODEL_PATH}'.")
    except Exception as exc:
        logger.error(f"Failed to load model: {exc}. Falling back to DEMO mode.")
        _demo_mode = True


def is_demo_mode() -> bool:
    return _demo_mode


def _preprocess(image_bytes: bytes) -> "np.ndarray":
    """Read raw bytes into a normalised numpy array ready for the model."""
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img = img.resize(IMAGE_SIZE)
    arr = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)  # (1, 224, 224, 3)


def predict(image_bytes: bytes) -> dict:
    """
    Run prediction on raw image bytes.

    Returns
    -------
    dict with keys: plant, disease, confidence, class_name, is_healthy, demo
    """
    if _demo_mode:
        return _demo_predict()

    arr = _preprocess(image_bytes)
    preds = _model.predict(arr)
    idx = int(np.argmax(preds, axis=1)[0])
    confidence = float(np.max(preds))
    class_name = CLASS_NAMES[idx]

    plant, disease, is_healthy = _parse_class_name(class_name)

    return {
        "plant": plant,
        "disease": disease,
        "confidence": round(confidence * 100, 2),
        "class_name": class_name,
        "is_healthy": is_healthy,
        "demo": False,
    }


def _demo_predict() -> dict:
    """Return a plausible simulated prediction for demo / testing."""
    class_name = random.choice(CLASS_NAMES)
    confidence = round(random.uniform(82, 99), 2)
    plant, disease, is_healthy = _parse_class_name(class_name)

    return {
        "plant": plant,
        "disease": disease,
        "confidence": confidence,
        "class_name": class_name,
        "is_healthy": is_healthy,
        "demo": True,
    }


def _parse_class_name(class_name: str) -> tuple:
    """
    Split a PlantVillage class name like 'Tomato___Early_blight'
    into (plant, disease, is_healthy).
    """
    if "___" in class_name:
        plant, disease = class_name.split("___", 1)
    else:
        plant, disease = class_name, "healthy"

    # Clean underscores for display
    plant = plant.replace("_", " ")
    disease = disease.replace("_", " ")

    is_healthy = disease.strip().lower() == "healthy"

    return plant, disease, is_healthy
