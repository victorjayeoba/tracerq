#!/bin/bash

# DeepSecure-AI VPS Deployment Script
# Run this script on your VPS to deploy the application

set -e

echo "🚀 Starting DeepSecure-AI deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    echo "Install Docker: curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    echo "Install Docker Compose: sudo curl -L \"https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose"
    echo "sudo chmod +x /usr/local/bin/docker-compose"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs
mkdir -p temp
mkdir -p ssl
mkdir -p DeepSecure-AI/checkpoints

# Set permissions
chmod 755 logs temp
chmod 700 ssl  # SSL certificates should be private

# Check if production.env exists
if [ ! -f "production.env" ]; then
    echo -e "${YELLOW}⚠️ production.env not found. Creating from template...${NC}"
    cp production.env.template production.env 2>/dev/null || echo "Please create production.env with your configuration"
fi

# Stop existing containers if running
echo "🛑 Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Health check
echo "🏥 Performing health check..."
if curl -f http://localhost:8000/health &> /dev/null; then
    echo -e "${GREEN}✅ API is healthy!${NC}"
else
    echo -e "${RED}❌ API health check failed${NC}"
    echo "Check logs with: docker-compose logs deepsecure-api"
    exit 1
fi

# Show status
echo "📊 Container status:"
docker-compose ps

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo "📖 API Documentation: http://your-server-ip/docs"
echo "🔍 Health Check: http://your-server-ip/health"
echo "📝 Logs: docker-compose logs -f deepsecure-api"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Update production.env with your domain and settings"
echo "2. Configure SSL certificates in the ssl/ directory"
echo "3. Update nginx.conf with your domain name"
echo "4. Test your API endpoints"

# Show useful commands
echo ""
echo -e "${YELLOW}🔧 Useful commands:${NC}"
echo "  View logs: docker-compose logs -f"
echo "  Restart: docker-compose restart"
echo "  Stop: docker-compose down"
echo "  Update: git pull && docker-compose up --build -d"
