# DeepSecure-AI FastAPI Backend

This is the FastAPI backend for the DeepSecure-AI deepfake detection system. It provides REST API endpoints for detecting deepfakes in images, videos, and audio files.

## Project Structure

```
backend/
├── DeepSecure-AI/         # Original DeepSecure-AI repository
│   ├── main.py            # Training script (leave as is)
│   ├── models/            # Neural network models
│   ├── data/              # Data processing utilities
│   ├── utils/             # Utility functions
│   └── ...
├── main.py                # FastAPI application
├── inference.py           # Inference wrapper for DeepSecure-AI
├── run.py                 # Startup script
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## Setup Instructions

### 1. Install Dependencies

Make sure you're in the backend directory and have your virtual environment activated:

```bash
cd backend
# Activate your virtual environment
.venv\Scripts\activate  # Windows
# OR
source .venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt
```

### 2. Run the Application

#### Option A: Using the startup script (Recommended)
```bash
python run.py
```

#### Option B: Direct FastAPI run
```bash
python main.py
```

#### Option C: Using uvicorn directly
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

Once the server is running, you can access:

- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Root Endpoint**: http://localhost:8000/

### Available Endpoints

#### POST `/detect/image`
Upload an image file to detect deepfakes.

**Request**: Multipart form with image file
**Response**: JSON with detection results

```json
{
  "is_fake": true,
  "confidence": 0.85,
  "result": "FAKE: 85% confidence",
  "file_path": "/tmp/temp_image.jpg"
}
```

#### POST `/detect/video`
Upload a video file to detect deepfakes.

**Request**: Multipart form with video file
**Response**: JSON with detection results

#### POST `/detect/audio`
Upload an audio file to detect deepfakes.

**Request**: Multipart form with audio file
**Response**: JSON with detection results

## Example Usage

### Using curl

```bash
# Detect deepfake in image
curl -X POST "http://localhost:8000/detect/image" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@path/to/your/image.jpg"

# Detect deepfake in video
curl -X POST "http://localhost:8000/detect/video" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@path/to/your/video.mp4"
```

### Using Python requests

```python
import requests

# Detect image
with open('test_image.jpg', 'rb') as f:
    files = {'file': f}
    response = requests.post('http://localhost:8000/detect/image', files=files)
    result = response.json()
    print(result)
```

## Configuration

### Environment Variables

You can set the following environment variables:

- `PORT`: Server port (default: 8000)
- `HOST`: Server host (default: 0.0.0.0)
- `LOG_LEVEL`: Logging level (default: info)

### Model Configuration

The inference wrapper will automatically load models from the `DeepSecure-AI/checkpoints/` directory. Make sure your trained models are placed there.

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure DeepSecure-AI is properly installed and all dependencies are satisfied.

2. **Model Loading Errors**: Check that model checkpoints are in the correct location.

3. **CUDA Issues**: The system will automatically use CPU if CUDA is not available.

4. **File Upload Errors**: Ensure the uploaded files are in supported formats:
   - Images: JPG, PNG, etc.
   - Videos: MP4, AVI, etc.
   - Audio: WAV, MP3, FLAC, etc.

### Debug Mode

To run in debug mode with more verbose logging:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload --log-level debug
```

## Development

### Adding New Endpoints

1. Add new route functions in `main.py`
2. Update the inference wrapper in `inference.py` if needed
3. Test the endpoint using the interactive docs at `/docs`

### Modifying Inference Logic

Edit the `DeepSecureInference` class in `inference.py` to modify how the models are used or how results are processed.

## License

This project inherits the license from the original DeepSecure-AI repository.
