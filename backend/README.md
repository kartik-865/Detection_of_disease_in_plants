# Plant Disease Detection — Backend

A lightweight FastAPI backend that serves plant disease predictions from the trained CNN model.

## Setup

```bash
cd backend
pip install -r requirements.txt
```

## Running

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.
Interactive docs at `http://localhost:8000/docs`.

## Endpoints

| Method | Path        | Description                                      |
|--------|-------------|--------------------------------------------------|
| GET    | `/`         | Health check — returns API status                |
| GET    | `/classes`  | Returns the list of 38 supported disease classes |
| POST   | `/predict`  | Upload a leaf image and get disease prediction   |

## Notes

- Place your trained model weights at `model/plant_disease_model.h5` (or update the `MODEL_PATH` in `config.py`).
- If no model file is found, the server starts in **demo mode** and returns simulated predictions so the frontend can be tested end-to-end.
