# E-Commerce App

This is a Next.js-based e-commerce application containerized with Docker.

## Prerequisites

- Docker installed and running on your system
- Docker Compose (usually included with Docker Desktop)

## Building and Running

### Using Docker Compose (Recommended)

1. Build and start the application:
   ```bash
   docker-compose up --build
   ```

2. The app will be available at http://localhost:3000

### Using Docker directly

1. Build the image:
   ```bash
   docker build -t e-commerce-app .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 e-commerce-app
   ```

3. Access the app at http://localhost:3000

## Development

For development, use the standard Next.js commands:

```bash
npm install
npm run dev
```

## Features

- Product catalog with categories (Men, Women, Kids)
- Shopping cart functionality
- User authentication (login/signup)
- Admin panel for managing products, orders, and customers
- Responsive design with Tailwind CSS and shadcn/ui components

## Notes

- The app uses mock data for demonstration purposes
- In production, you would need to connect to a real database and implement proper authentication