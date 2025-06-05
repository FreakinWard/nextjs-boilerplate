# Hey Margot

This repository contains a full-stack application with a Next.js frontend and a FastAPI backend, configured to run with DDEV for local development.

## Project Overview

The project consists of two main components:

1. **Frontend**: A Next.js application located in the `frontend/` directory
2. **Backend**: A FastAPI application located in the `backend/` directory

Both components are configured to run together using DDEV, which provides a consistent development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- [DDEV](https://ddev.readthedocs.io/en/stable/) (latest version)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/downloads)

## DDEV Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/hey-margot-ui.git
cd hey-margot-ui
```

### 2. Start DDEV

```bash
ddev start
```

This command will:
- Set up the DDEV environment based on the configuration in `.ddev/config.yaml`
- Create a Python virtual environment for the backend
- Install backend dependencies from `requirements.txt`
- Start both the frontend and backend services using PM2

### 3. Access the Application

Once DDEV has started, you can access the application at:

- Frontend: [https://app.margot.ddev.site](https://app.margot.ddev.site)
- Backend API: [https://api.margot.ddev.site](https://api.margot.ddev.site)

## Project Structure

```
hey-margot-ui/
├── .ddev/                  # DDEV configuration files
├── backend/                # Python FastAPI backend
│   ├── .venv/              # Python virtual environment (created by DDEV)
│   ├── main.py             # Main FastAPI application
│   ├── db.py               # Database configuration
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Docker configuration for backend
├── frontend/               # Next.js frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   ├── package.json        # Node.js dependencies
│   └── Dockerfile          # Docker configuration for frontend
└── apps.config.js          # PM2 configuration for running both services
```

## Development Workflow

### Running Commands in DDEV

You can run commands in the DDEV environment using:

```bash
ddev exec <command>
```

### Backend Development

To work on the backend:

```bash
ddev exec cd backend && ./.venv/bin/python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development

To work on the frontend:

```bash
ddev exec cd frontend && npm run dev
```

### Database Access

The PostgreSQL database is accessible at:

- Host: `db`
- Port: `5432`
- Username: `db`
- Password: `db`
- Database: `db`

You can connect to the database using:

```bash
ddev exec psql -h db -U db db
```

## Stopping DDEV

To stop the DDEV environment:

```bash
ddev stop
```

## Additional Resources

- [DDEV Documentation](https://ddev.readthedocs.io/en/stable/)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## PM2 Commands

PM2 is used to manage the frontend and backend processes within the DDEV environment. Here are some useful PM2 commands:

### View Process Status

To see the status of all running processes:

```bash
ddev exec pm2 status
```

### Restart Services

To restart all services:

```bash
ddev exec pm2 restart all
```

To restart a specific service:

```bash
ddev pm2 restart Frontend  # Restart only the frontend
ddev pm2 restart Backend   # Restart only the backend
```

### View Logs

To view logs for all services:

```bash
ddev pm2 logs
```

To view logs for a specific service:

```bash
ddev pm2 logs Frontend  # View only frontend logs
ddev pm2 logs Backend   # View only backend logs
```

To view logs with timestamp:

```bash
ddev pm2 logs --timestamp
```

### Stop and Start Services

To stop all services:

```bash
ddev pm2 stop all
```

To start all services:

```bash
ddev pm2 start all
```

To stop or start a specific service:

```bash
ddev pm2 stop Frontend    # Stop frontend
ddev pm2 start Frontend   # Start frontend
```

### Monitor Resources

To monitor CPU and memory usage in real-time:

```bash
ddev pm2 monit
```

## Environment Variables

### Frontend Environment Variables

The frontend application uses environment variables to configure various aspects of the application, including the connection to the backend API. These variables can be set in a `.env` file in the `frontend/` directory.

#### Available Environment Variables

- `NEXT_PUBLIC_API_URL`: The URL of the backend API. Default: `https://api.margot.ddev.site`

#### Setting Environment Variables

For local development, you can create a `.env` file in the `frontend/` directory with the following content:

```bash
NEXT_PUBLIC_API_URL=https://api.margot.ddev.site
```

For different environments (staging, production, etc.), you can set these environment variables accordingly.

## Troubleshooting

### Port Conflicts

If you encounter port conflicts, you can modify the ports in `.ddev/config.yaml`.
