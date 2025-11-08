#!/usr/bin/env python3
"""
Startup script for DeepSecure-AI FastAPI backend
"""

import os
import sys
import subprocess
import uvicorn
from pathlib import Path

def check_dependencies():
    """Check if all required dependencies are installed"""
    # map pip package name -> python import name
    package_map = {
        "fastapi": "fastapi",
        "uvicorn": "uvicorn",
        "torch": "torch",
        "tensorflow": "tensorflow",
        "opencv-python": "cv2",   # FIXED
        "librosa": "librosa"
    }

    missing_packages = []
    for pkg, import_name in package_map.items():
        try:
            __import__(import_name)
        except ImportError:
            missing_packages.append(pkg)

    if missing_packages:
        print(f"Missing packages: {', '.join(missing_packages)}")
        print("Please install them using: pip install -r requirements.txt")
        return False

    return True

def setup_environment():
    """Setup the environment for running the application"""
    # Add DeepSecure-AI to Python path
    deepsecure_path = Path(__file__).parent / "DeepSecure-AI"
    if deepsecure_path.exists():
        sys.path.insert(0, str(deepsecure_path))
        print(f"Added {deepsecure_path} to Python path")
    else:
        print(f"Warning: DeepSecure-AI directory not found at {deepsecure_path}")

def main():
    """Main function to run the FastAPI application"""
    print("Starting DeepSecure-AI FastAPI Backend...")
    
    # Check dependencies first
    if not check_dependencies():
        sys.exit(1)
    
    # Import and run the FastAPI app
    try:
        # Import from the current directory (backend), not DeepSecure-AI
        from main import app
        
        # Setup environment after importing the app
        setup_environment()
        
        print("✅ Dependencies checked successfully")
        print("🚀 Starting FastAPI server...")
        
        # Get configuration from environment
        host = os.getenv("API_HOST", "0.0.0.0")
        port = int(os.getenv("API_PORT", "8083"))
        workers = int(os.getenv("API_WORKERS", "1"))
        log_level = os.getenv("LOG_LEVEL", "info")
        
        print(f"📖 API Documentation will be available at: http://localhost:{port}/docs")
        print(f"🔍 Health check available at: http://localhost:{port}/health")
        
        # Run the server
        if workers > 1:
            # Use gunicorn for production with multiple workers
            try:
                import gunicorn
                cmd = [
                    "gunicorn", 
                    "main:app",
                    "-w", str(workers),
                    "-k", "uvicorn.workers.UvicornWorker",
                    "--bind", f"{host}:{port}",
                    "--log-level", log_level,
                    "--access-logfile", "-",
                    "--error-logfile", "-"
                ]
                print(f"🚀 Starting with Gunicorn: {workers} workers")
                subprocess.run(cmd)
            except ImportError:
                print("⚠️ Gunicorn not available, falling back to single worker")
                uvicorn.run(
                    app,
                    host=host,
                    port=port,
                    reload=False,
                    log_level=log_level
                )
        else:
            # Single worker with uvicorn
            uvicorn.run(
                app,
                host=host,
                port=port,
                reload=False,
                log_level=log_level
            )
        
    except ImportError as e:
        print(f"❌ Error importing main app: {e}")
        print("Make sure all dependencies are installed and the main.py file exists")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
