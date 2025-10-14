# Use Node.js 20 Alpine as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Expose port 9000 (Medusa default)
EXPOSE 9000

# Create startup script
COPY start.sh .

# Give execute permission
RUN chmod +x start.sh

# Start the application with migrations
CMD ./start.sh
