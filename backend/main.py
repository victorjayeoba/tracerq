from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from inference import DeepSecureInference
import os
import tempfile
import shutil

app = FastAPI(
    title="DeepSecure-AI API",
    description="Multimodal deepfake detection API for images, videos, and audio",
    version="1.0.0"
)

# Production CORS configuration
import os

# Load environment variables (with fallback if dotenv not available)
try:
    from dotenv import load_dotenv
    load_dotenv("production.env", override=True)
    print("✅ Loaded environment from production.env")
except ImportError:
    print("⚠️ python-dotenv not available, using system environment variables")
except Exception as e:
    print(f"⚠️ Could not load production.env: {e}")

# Get CORS settings from environment
allowed_origins = os.getenv("ALLOWED_ORIGINS", '["*"]')
if isinstance(allowed_origins, str):
    import json
    try:
        allowed_origins = json.loads(allowed_origins)
    except:
        allowed_origins = ["*"]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize the inference engine
inference_engine = DeepSecureInference()

@app.get("/")
async def root():
    return {"message": "DeepSecure-AI API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "DeepSecure-AI"}

@app.post("/detect/image")
async def detect_image(file: UploadFile = File(...)):
    """
    Detect deepfakes in uploaded images
    """
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp_file:
            shutil.copyfileobj(file.file, tmp_file)
            tmp_path = tmp_file.name
        
        # Run inference
        result = inference_engine.detect_image(tmp_path)
        
        # Clean up
        os.unlink(tmp_path)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/detect/video")
async def detect_video(file: UploadFile = File(...)):
    """
    Detect deepfakes in uploaded videos
    """
    if not file.content_type.startswith('video/'):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp_file:
            shutil.copyfileobj(file.file, tmp_file)
            tmp_path = tmp_file.name
        
        # Run inference
        result = inference_engine.detect_video(tmp_path)
        
        # Clean up
        os.unlink(tmp_path)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

@app.post("/detect/audio")
async def detect_audio(file: UploadFile = File(...)):
    """
    Detect deepfakes in uploaded audio files
    """
    if not file.content_type.startswith('audio/'):
        raise HTTPException(status_code=400, detail="File must be an audio file")
    
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp_file:
            shutil.copyfileobj(file.file, tmp_file)
            tmp_path = tmp_file.name
        
        # Run inference
        result = inference_engine.detect_audio(tmp_path)
        
        # Clean up
        os.unlink(tmp_path)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8083)
