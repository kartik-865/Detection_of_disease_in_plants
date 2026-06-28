"""
Plant Disease Detection — FastAPI Backend
==========================================
A lightweight REST API that accepts plant leaf images and returns
disease classification results from the trained CNN model.

Run with:
    uvicorn main:app --reload --port 8000
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import ALLOWED_ORIGINS, CLASS_NAMES
from model import load_model, predict, is_demo_mode


# ─── Lifespan ──────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load the ML model on startup."""
    load_model()
    yield


# ─── App Initialisation ───────────────────────────────────────────────────────
app = FastAPI(
    title="Plant Disease Detection API",
    description="Upload a plant leaf image to detect diseases using a CNN trained on the PlantVillage dataset.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow the frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Routes ────────────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def health_check():
    """Basic health check endpoint."""
    return {
        "status": "ok",
        "service": "Plant Disease Detection API",
        "demo_mode": is_demo_mode(),
    }


@app.get("/classes", tags=["Info"])
async def get_classes():
    """Return the list of 38 supported plant-disease classes."""
    return {
        "count": len(CLASS_NAMES),
        "classes": CLASS_NAMES,
    }


ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/bmp"}


@app.post("/predict", tags=["Prediction"])
async def predict_disease(file: UploadFile = File(...)):
    """
    Accept a leaf image and return the predicted plant species,
    disease name, and confidence score.

    **Request**: `multipart/form-data` with a field named `file`.

    **Response**:
    ```json
    {
      "plant": "Tomato",
      "disease": "Early blight",
      "confidence": 94.32,
      "class_name": "Tomato___Early_blight",
      "is_healthy": false,
      "demo": false
    }
    ```
    """
    # Validate content type
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{file.content_type}'. "
                   f"Accepted types: {', '.join(ALLOWED_CONTENT_TYPES)}",
        )

    # Read image bytes
    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Failed to read file: {exc}")

    # Run prediction
    try:
        result = predict(image_bytes)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {exc}",
        )

    return JSONResponse(content=result)
