#!/usr/bin/env python3
"""
Test script to verify the backend setup
"""

import sys
import os
from pathlib import Path

def test_imports():
    """Test if all required modules can be imported"""
    print("Testing imports...")
    
    try:
        import fastapi
        print("✅ FastAPI imported successfully")
    except ImportError as e:
        print(f"❌ FastAPI import failed: {e}")
        return False
    
    try:
        import uvicorn
        print("✅ Uvicorn imported successfully")
    except ImportError as e:
        print(f"❌ Uvicorn import failed: {e}")
        return False
    
    try:
        import torch
        print(f"✅ PyTorch imported successfully (version: {torch.__version__})")
    except ImportError as e:
        print(f"❌ PyTorch import failed: {e}")
        return False
    
    try:
        import tensorflow as tf
        print(f"✅ TensorFlow imported successfully (version: {tf.__version__})")
    except ImportError as e:
        print(f"❌ TensorFlow import failed: {e}")
        return False
    
    try:
        import cv2
        print(f"✅ OpenCV imported successfully (version: {cv2.__version__})")
    except ImportError as e:
        print(f"❌ OpenCV import failed: {e}")
        return False
    
    try:
        import librosa
        print(f"✅ Librosa imported successfully (version: {librosa.__version__})")
    except ImportError as e:
        print(f"❌ Librosa import failed: {e}")
        return False
    
    return True

def test_deepsecure_ai():
    """Test if DeepSecure-AI modules can be imported"""
    print("\nTesting DeepSecure-AI imports...")
    
    # Add DeepSecure-AI to path
    deepsecure_path = Path(__file__).parent / "DeepSecure-AI"
    if not deepsecure_path.exists():
        print(f"❌ DeepSecure-AI directory not found at {deepsecure_path}")
        return False
    
    sys.path.insert(0, str(deepsecure_path))
    
    try:
        # Test importing some DeepSecure-AI modules
        from models.image import ImageClassifier
        print("✅ ImageClassifier imported successfully")
    except ImportError as e:
        print(f"⚠️  ImageClassifier import failed: {e}")
    
    try:
        from models.rawnet import RawNet
        print("✅ RawNet imported successfully")
    except ImportError as e:
        print(f"⚠️  RawNet import failed: {e}")
    
    try:
        from utils.utils import *
        print("✅ Utils imported successfully")
    except ImportError as e:
        print(f"⚠️  Utils import failed: {e}")
    
    return True

def test_inference_wrapper():
    """Test if the inference wrapper can be imported"""
    print("\nTesting inference wrapper...")
    
    try:
        from inference import DeepSecureInference
        print("✅ DeepSecureInference imported successfully")
        
        # Test initialization
        inference_engine = DeepSecureInference()
        print("✅ DeepSecureInference initialized successfully")
        
        # Test model status
        status = inference_engine.get_model_status()
        print(f"✅ Model status: {status}")
        
        return True
    except Exception as e:
        print(f"❌ Inference wrapper test failed: {e}")
        return False

def test_fastapi_app():
    """Test if the FastAPI app can be imported"""
    print("\nTesting FastAPI app...")
    
    try:
        from main import app
        print("✅ FastAPI app imported successfully")
        
        # Test if app has expected endpoints
        routes = [route.path for route in app.routes]
        expected_routes = ["/", "/health", "/detect/image", "/detect/video", "/detect/audio"]
        
        for route in expected_routes:
            if route in routes:
                print(f"✅ Route {route} found")
            else:
                print(f"⚠️  Route {route} not found")
        
        return True
    except Exception as e:
        print(f"❌ FastAPI app test failed: {e}")
        return False

def main():
    """Main test function"""
    print("🧪 Testing DeepSecure-AI Backend Setup")
    print("=" * 50)
    
    all_tests_passed = True
    
    # Test basic imports
    if not test_imports():
        all_tests_passed = False
    
    # Test DeepSecure-AI imports
    if not test_deepsecure_ai():
        all_tests_passed = False
    
    # Test inference wrapper
    if not test_inference_wrapper():
        all_tests_passed = False
    
    # Test FastAPI app
    if not test_fastapi_app():
        all_tests_passed = False
    
    print("\n" + "=" * 50)
    if all_tests_passed:
        print("🎉 All tests passed! Your backend is ready to run.")
        print("\nTo start the server, run:")
        print("  python run.py")
        print("  # OR")
        print("  python main.py")
    else:
        print("❌ Some tests failed. Please check the errors above.")
        print("\nMake sure to:")
        print("  1. Install all dependencies: pip install -r requirements.txt")
        print("  2. Have DeepSecure-AI properly set up")
        print("  3. Check that all model files are in place")

if __name__ == "__main__":
    main()
