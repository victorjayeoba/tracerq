# DeepSecure-AI VPS Deployment Guide

This guide will help you deploy your DeepSecure-AI backend API to a VPS so your frontend can call it.

## 📋 Prerequisites

### VPS Requirements
- **OS**: Ubuntu 20.04 LTS or newer (recommended)
- **RAM**: Minimum 4GB (8GB+ recommended for AI models)
- **Storage**: Minimum 20GB free space
- **CPU**: 2+ cores (4+ recommended)
- **Network**: Public IP address with ports 80 and 443 open

### Required Software on VPS
- Docker
- Docker Compose
- Git
- Curl

## 🚀 Quick Deployment

### 1. Connect to Your VPS
```bash
ssh root@your-server-ip
# or
ssh your-username@your-server-ip
```

### 2. Install Dependencies
```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
apt install git -y
```

### 3. Clone Your Repository
```bash
cd /opt
git clone https://github.com/your-username/your-repo.git deepsecure-ai
cd deepsecure-ai/backend
```

### 4. Configure Environment
```bash
# Copy and edit the production environment file
cp production.env production.env.backup
nano production.env
```

**Important**: Update these values in `production.env`:
- `ALLOWED_ORIGINS`: Add your frontend domain
- `SECRET_KEY`: Generate a secure secret key
- `ALLOWED_HOSTS`: Add your server IP and domain

### 5. Deploy
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 Manual Configuration

### Environment Variables (`production.env`)
```env
# CORS Configuration - IMPORTANT!
ALLOWED_ORIGINS=["https://your-frontend-domain.com", "http://localhost:3000"]

# Security
SECRET_KEY=your-super-secure-secret-key-here
ALLOWED_HOSTS=["your-domain.com", "your-server-ip"]

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
```

### Nginx Configuration
1. Edit `nginx.conf` and replace `server_name _;` with your domain:
```nginx
server_name your-domain.com www.your-domain.com;
```

2. For SSL (HTTPS), uncomment the SSL server block and add your certificates to the `ssl/` directory.

## 🌐 DNS Configuration

Point your domain to your VPS:
```
A    @    your-server-ip
A    www  your-server-ip
```

## 🔒 SSL Certificate (HTTPS)

### Option 1: Let's Encrypt (Free)
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (add to crontab)
crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Manual Certificate
Place your SSL certificate files in the `ssl/` directory:
- `ssl/cert.pem` - Your certificate
- `ssl/key.pem` - Your private key

## 🧪 Testing Your API

### Health Check
```bash
curl http://your-server-ip/health
# Should return: {"status":"healthy","service":"DeepSecure-AI"}
```

### API Documentation
Visit: `http://your-server-ip/docs`

### Test Endpoints
```bash
# Test image detection
curl -X POST "http://your-server-ip/detect/image" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@test-image.jpg"
```

## 🔄 Frontend Integration

Update your frontend to call your VPS API:

```javascript
// Replace localhost with your VPS domain/IP
const API_BASE_URL = 'https://your-domain.com'; // or 'http://your-server-ip'

// Example API call
const detectImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  const response = await fetch(`${API_BASE_URL}/detect/image`, {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
};
```

## 🐛 Troubleshooting

### Check Logs
```bash
# API logs
docker-compose logs -f deepsecure-api

# Nginx logs
docker-compose logs -f nginx

# All services
docker-compose logs -f
```

### Common Issues

1. **CORS Errors**: Update `ALLOWED_ORIGINS` in `production.env`
2. **Port Issues**: Ensure ports 80 and 443 are open in your VPS firewall
3. **Memory Issues**: Consider upgrading VPS if models fail to load
4. **SSL Issues**: Check certificate paths and domain configuration

### Restart Services
```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart deepsecure-api

# Full rebuild
docker-compose down
docker-compose up --build -d
```

## 📊 Monitoring

### Check Service Status
```bash
docker-compose ps
```

### Monitor Resources
```bash
# Container stats
docker stats

# System resources
htop
```

### Health Monitoring
Set up a cron job to check API health:
```bash
# Add to crontab
*/5 * * * * curl -f http://localhost/health || echo "API Down" | mail -s "DeepSecure API Alert" your-email@domain.com
```

## 🔄 Updates

To update your deployment:
```bash
cd /opt/deepsecure-ai/backend
git pull
docker-compose up --build -d
```

## 🔐 Security Best Practices

1. **Firewall**: Only open necessary ports (80, 443, SSH)
2. **SSH**: Use key-based authentication, disable password auth
3. **Updates**: Keep system and Docker updated
4. **Backup**: Regular backups of your application and data
5. **Monitoring**: Set up log monitoring and alerts
6. **SSL**: Always use HTTPS in production
7. **Environment**: Never commit secrets to git

## 📝 Production Checklist

- [ ] VPS configured with required resources
- [ ] Docker and Docker Compose installed
- [ ] Repository cloned and configured
- [ ] `production.env` updated with correct values
- [ ] DNS pointed to VPS
- [ ] SSL certificate configured
- [ ] Firewall configured
- [ ] API tested and working
- [ ] Frontend updated to use VPS API
- [ ] Monitoring and logging set up
- [ ] Backup strategy implemented

## 🆘 Support

If you encounter issues:
1. Check the logs first
2. Verify your configuration
3. Test individual components
4. Check network connectivity
5. Consult the Docker and FastAPI documentation

Your API will be available at:
- **HTTP**: `http://your-server-ip` or `http://your-domain.com`
- **HTTPS**: `https://your-domain.com` (after SSL setup)
- **Documentation**: `/docs` endpoint
- **Health Check**: `/health` endpoint
