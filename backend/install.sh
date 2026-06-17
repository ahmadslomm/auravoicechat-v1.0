#!/bin/bash

# Aura Voice Chat Backend Auto-Install Script
# Target: Ubuntu 22.04+

set -e

echo "🚀 Starting Aura Voice Chat Backend Installation..."

# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20 via NVM
if ! command -v nvm &> /dev/null; then
    echo "Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

nvm install 20
nvm use 20

# 3. Install PostgreSQL 15
sudo apt install -y gnupg2 wget
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
sudo apt update
sudo apt install -y postgresql-15

# 4. Install Redis
sudo apt install -y redis-server

# 5. Install PM2 and Nginx
npm install -g pm2
sudo apt install -y nginx

# 6. Install project dependencies
npm install

# 7. Setup Environment
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Created .env from .env.example. Please update it with real credentials!"
fi

# 8. Prisma Migration and Seed
npx prisma generate
# npx prisma migrate deploy # Uncomment when DB is ready
# npx prisma db seed       # Uncomment when DB is ready

# 9. Build project
npm run build

# 10. Configure Nginx (Reverse Proxy)
cat <<EOF | sudo tee /etc/nginx/sites-available/aura
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/aura /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 11. Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Installation Complete! Server is running at port 80."
echo "💡 Don't forget to update your .env file and run prisma migrations."
