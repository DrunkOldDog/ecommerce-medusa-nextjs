#!/bin/sh

# Run migrations and start server
echo "Running database migrations..."
npx medusa db:migrate

echo "Seeding database..."
pnpm run seed || echo "Seeding failed, continuing..."

echo "Starting Medusa development server..."
pnpm run dev