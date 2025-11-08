#!/usr/bin/env python3
"""
Simple API test script for DeepSecure-AI
Run this to test your API endpoints after deployment
"""

import requests
import sys
import os
import time
from pathlib import Path

def test_api(base_url="http://localhost:8083"):
    """Test all API endpoints"""
    
    print(f"🧪 Testing DeepSecure-AI API at {base_url}")
    print("=" * 50)
    
    # Test 1: Health Check
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health", timeout=10)
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False
    
    # Test 2: Root endpoint
    print("\n2. Testing root endpoint...")
    try:
        response = requests.get(f"{base_url}/", timeout=10)
        if response.status_code == 200:
            print("✅ Root endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
    
    # Test 3: API Documentation
    print("\n3. Testing API documentation...")
    try:
        response = requests.get(f"{base_url}/docs", timeout=10)
        if response.status_code == 200:
            print("✅ API documentation accessible")
        else:
            print(f"❌ API documentation failed: {response.status_code}")
    except Exception as e:
        print(f"❌ API documentation error: {e}")
    
    # Test 4: File upload endpoints (if test files exist)
    test_image_path = Path("DeepSecure-AI/images/lady.jpg")
    test_video_path = Path("DeepSecure-AI/videos/aaa.mp4")
    test_audio_path = Path("DeepSecure-AI/audios/DF_E_2000027.flac")
    
    if test_image_path.exists():
        print("\n4. Testing image detection endpoint...")
        try:
            with open(test_image_path, 'rb') as f:
                files = {'file': ('test.jpg', f, 'image/jpeg')}
                response = requests.post(f"{base_url}/detect/image", files=files, timeout=30)
                
            if response.status_code == 200:
                result = response.json()
                print("✅ Image detection working")
                print(f"   Result: {result.get('result', 'No result')}")
                print(f"   Is Fake: {result.get('is_fake', 'Unknown')}")
                print(f"   Confidence: {result.get('confidence', 'Unknown')}")
            else:
                print(f"❌ Image detection failed: {response.status_code}")
                print(f"   Error: {response.text}")
        except Exception as e:
            print(f"❌ Image detection error: {e}")
    else:
        print("\n4. ⚠️  Skipping image test (no test image found)")
    
    if test_video_path.exists():
        print("\n5. Testing video detection endpoint...")
        try:
            with open(test_video_path, 'rb') as f:
                files = {'file': ('test.mp4', f, 'video/mp4')}
                response = requests.post(f"{base_url}/detect/video", files=files, timeout=60)
                
            if response.status_code == 200:
                result = response.json()
                print("✅ Video detection working")
                print(f"   Result: {result.get('result', 'No result')}")
                print(f"   Is Fake: {result.get('is_fake', 'Unknown')}")
                print(f"   Confidence: {result.get('confidence', 'Unknown')}")
            else:
                print(f"❌ Video detection failed: {response.status_code}")
                print(f"   Error: {response.text}")
        except Exception as e:
            print(f"❌ Video detection error: {e}")
    else:
        print("\n5. ⚠️  Skipping video test (no test video found)")
    
    if test_audio_path.exists():
        print("\n6. Testing audio detection endpoint...")
        try:
            with open(test_audio_path, 'rb') as f:
                files = {'file': ('test.flac', f, 'audio/flac')}
                response = requests.post(f"{base_url}/detect/audio", files=files, timeout=60)
                
            if response.status_code == 200:
                result = response.json()
                print("✅ Audio detection working")
                print(f"   Result: {result.get('result', 'No result')}")
                print(f"   Is Fake: {result.get('is_fake', 'Unknown')}")
                print(f"   Confidence: {result.get('confidence', 'Unknown')}")
            else:
                print(f"❌ Audio detection failed: {response.status_code}")
                print(f"   Error: {response.text}")
        except Exception as e:
            print(f"❌ Audio detection error: {e}")
    else:
        print("\n6. ⚠️  Skipping audio test (no test audio found)")
    
    print("\n" + "=" * 50)
    print("🎉 API testing completed!")
    print(f"📖 Full documentation: {base_url}/docs")
    
    return True

def main():
    """Main function"""
    # Get base URL from command line or environment
    base_url = sys.argv[1] if len(sys.argv) > 1 else os.getenv("API_BASE_URL", "http://localhost:8083")
    
    print("🚀 DeepSecure-AI API Test Script")
    print(f"Target: {base_url}")
    
    # Wait a moment for API to be ready
    print("⏳ Waiting for API to be ready...")
    time.sleep(2)
    
    success = test_api(base_url)
    
    if success:
        print("\n✅ All basic tests passed!")
        sys.exit(0)
    else:
        print("\n❌ Some tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
