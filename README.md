# E-commerce Docker Setup

This project contains a complete e-commerce solution with Medusa backend and Next.js storefront, all containerized with Docker Compose.

## Architecture

- **Backend**: Medusa.js e-commerce backend (Port 9000)
- **Frontend**: Next.js storefront (Port 8000)
- **CMS**: Payload CMS for content management (Port 3000)
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
   - **Payload CMS Admin**: http://localhost:3000/admin
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

### CMS (Payload)
- **Port**: 3000
- **Framework**: Payload CMS 3.59.1
- **Database**: PostgreSQL (separate database: payload)
- **Features**: Content management, media handling, user management, API endpoints
- **Collections**: Products, Categories, Collections, Media, Users
- **Admin Panel**: http://localhost:3000/admin

### Database (PostgreSQL)
- **Port**: 5432
- **Version**: PostgreSQL 16
- **Databases**: 
  - `medusa` - Medusa backend data
  - `payload` - Payload CMS data
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

This project was based off Medusa Next.js template, ref: https://medusajs.com/nextjs-commerce/.

## CMS Integration

The project includes Payload CMS integration with Medusa for enhanced content management:

- **Synchronization**: Automatic sync between Medusa and Payload CMS
- **Collections**: Products, Categories, Collections, Media, and Users are managed in Payload
- **API Integration**: Medusa backend communicates with Payload CMS via REST API
- **Content Management**: Rich content editing capabilities with Payload's admin interface

### CMS Features

- **Product Management**: Create and manage products with rich content
- **Category Management**: Organize products with hierarchical categories
- **Collection Management**: Group products into collections
- **Media Management**: Upload and manage images and files
- **User Management**: Manage CMS users and permissions

## User Management

### Medusa Admin User
To create a Medusa Admin User:
```bash
npx medusa user -e admin@medusajs.com -p supersecret
```

### Payload CMS Admin User
The first user will be created automatically when you access the Payload admin panel at http://localhost:3000/admin. Follow the setup wizard to create your admin account.



## File Structure

```
ecommerce/
├── docker-compose.yml                    # Main Docker Compose configuration
├── ecommerce-template/                   # Medusa backend
│   ├── Dockerfile
│   ├── medusa-config.ts
│   ├── package.json
│   └── src/
├── ecommerce-template-cms/               # Payload CMS
│   ├── Dockerfile
│   ├── next.config.mjs
│   ├── package.json
│   └── src/
│       ├── collections/                  # CMS collections (Products, Categories, etc.)
│       ├── app/                          # Next.js app with Payload integration
│       └── payload.config.ts             # Payload configuration
├── ecommerce-template-storefront/        # Next.js storefront
│   ├── Dockerfile
│   ├── next.config.js
│   ├── package.json
│   └── src/
└── README.md                             # This file
```

