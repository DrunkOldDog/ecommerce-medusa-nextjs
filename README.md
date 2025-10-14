# E-commerce Docker Setup

This project contains a complete e-commerce solution with Medusa backend and Next.js storefront, all containerized with Docker Compose.

## Architecture

- **Backend**: Medusa.js e-commerce backend (Port 9000)
- **Frontend**: Next.js storefront (Port 8000)
- **Database**: PostgreSQL (Port 5432)
- **Cache**: Redis (Port 6379)

## Prerequisites

- Docker and Docker Compose installed
- Git (to clone the repository)

## Quick Start

1. **Clone and navigate to the project**:
   ```bash
   git clone <your-repo-url>
   cd ecommerce
   ```

2. **Start all services**:
   ```bash
   docker-compose up -d
   ```

3. **Wait for services to start**:
   The database migrations and seeding happen automatically on first startup.

4. **Access the applications**:
   - **Storefront**: http://localhost:8000
   - **Backend API**: http://localhost:9000
   - **Admin Dashboard**: http://localhost:9000/app
   - **Database**: localhost:5432
   - **Redis**: localhost:6379

## Services

### Backend (Medusa)
- **Port**: 9000
- **Framework**: Medusa.js v2
- **Database**: PostgreSQL
- **Cache**: Redis
- **Features**: Admin dashboard, API, authentication

### Storefront (Next.js)
- **Port**: 8000
- **Framework**: Next.js 15
- **Features**: Product catalog, cart, checkout, user accounts

### Database (PostgreSQL)
- **Port**: 5432
- **Version**: PostgreSQL 16
- **Database**: medusa
- **Credentials**: postgres/postgres

### Cache (Redis)
- **Port**: 6379
- **Version**: Redis 7
- **Purpose**: Session storage, caching, event bus

## Development

### Running in Development Mode

The docker-compose.yml is configured for development with:
- Hot reloading enabled
- Source code mounted as volumes
- Development environment variables


### Environment Variables

The following environment variables are configured:

**Backend**:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `STORE_CORS`: CORS settings for storefront
- `ADMIN_CORS`: CORS settings for admin
- `AUTH_CORS`: CORS settings for authentication

**Storefront**:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: Backend API URL
- `NEXT_PUBLIC_BASE_URL`: Storefront base URL

## File Structure

```
ecommerce/
├── docker-compose.yml                    # Main Docker Compose configuration
├── ecommerce-template/                   # Medusa backend
│   ├── Dockerfile
│   ├── medusa-config.ts
│   ├── package.json
│   └── src/
├── ecommerce-template-storefront/        # Next.js storefront
│   ├── Dockerfile
│   ├── next.config.js
│   ├── package.json
│   └── src/
└── README.md                             # This file
```

