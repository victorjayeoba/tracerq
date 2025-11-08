#!/bin/bash

# Quick start script for DeepSecure-AI
# This is a simpler script for starting the application

set -e

echo "🚀 Starting DeepSecure-AI..."

# Check if running with Docker
if [ "$1" = "docker" ]; then
    echo "🐳 Starting with Docker..."
    docker-compose up -d
    echo "✅ Services started!"
    echo "📖 API Documentation: http://localhost/docs"
    echo "🔍 Health Check: http://localhost/health"
    exit 0
fi

# Check Python dependencies
echo "🔍 Checking Python dependencies..."
if ! python -c "import fastapi, uvicorn" &> /dev/null; then
    echo "❌ Missing dependencies. Installing..."
    pip install -r requirements.txt
fi

# Load environment
if [ -f "production.env" ]; then
    export $(cat production.env | grep -v '^#' | xargs)
    echo "✅ Loaded production environment"
fi

# Start the application
echo "🎯 Starting FastAPI application..."
python run.py

echo "✅ Application started!"
echo "📖 API Documentation: http://localhost:8001/docs"
echo "🔍 Health Check: http://localhost:8001/health"
