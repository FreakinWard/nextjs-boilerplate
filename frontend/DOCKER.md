# Docker Setup for Next.js Boilerplate

This guide explains how to use Docker with this Next.js boilerplate project for both development and production environments.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Development Environment

To start the development environment:

```bash
docker compose up dev
```

This will:

- Build the development Docker image
- Mount your local codebase into the container
- Start the Next.js development server with hot reloading
- Make the application available at http://localhost:3000

## Production Environment

To start the production environment locally:

```bash
docker compose up prod
```

This will:

- Build the optimized production Docker image
- Start the Next.js application in production mode
- Make the application available at http://localhost:3000

## Building for Digital Ocean Deployment

To build and push the Docker image to Digital Ocean Container Registry:

1. Build the production image:

   ```bash
   docker build -t registry.digitalocean.com/your-registry/hey-margot-ui:latest .
   ```

2. Push the image to Digital Ocean:

   ```bash
   docker push registry.digitalocean.com/your-registry/hey-margot-ui:latest
   ```

3. Deploy using the Digital Ocean App Platform or Kubernetes.

## Environment Variables

For production deployment, you may need to set environment variables. You can:

1. Add them to the `docker-compose.yml` file under the `prod` service
2. Use a `.env` file (make sure to add it to `.dockerignore` if it contains secrets)
3. Set them directly in your Digital Ocean deployment configuration

## Notes

- The production build uses Next.js's standalone output mode for smaller image sizes
- Security considerations are minimal as specified, but consider adding proper security measures for real production use
