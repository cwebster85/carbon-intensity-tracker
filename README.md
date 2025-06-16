# Carbon Intensity Tracker

A full stack web application that allows users to read, update, delete, and store national carbon intensity values.

## Features

- View carbon intensity data by country
- Add new carbon intensity records
- Update existing carbon intensity values
- Delete carbon intensity records
- Responsive design for desktop and mobile devices

## Technology Stack

- **Backend**: Node.js with Express
- **Frontend**: React with TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Containerization**: Docker
- **Testing**: Jest

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- PostgreSQL (for local development without Docker)

### Running with Docker

1. Clone the repository
2. Navigate to the project root directory
3. Run the application:

```bash
docker-compose up
```

This will start:
- Frontend on http://localhost:5173
- Backend API on http://localhost:3001
- PostgreSQL database on port 5434

### Local Development

#### Database Setup

1. Install PostgreSQL if not already installed
2. Create a database named `carbon_db`:
```sql
CREATE DATABASE carbon_db;
```
3. Create a user or use the default `postgres` user

#### Backend

```bash
cd backend/carbon-intensity-api/app
npm install

# Create a .env file with your database credentials
cat > .env << EOL
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=carbon_db
DB_PORT=5432
EOL

# Start the development server
npm run dev
```

#### Frontend

```bash
cd frontend/carbon-intensity-FE
npm install
npm run dev
```

> **Note**: If you encounter database connection issues, the application will automatically fall back to using in-memory storage.

## Development Commands

### Backend

- `npm run dev`: Start development server
- `npm test`: Run tests
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:
- Runs linters and formatters
- Ensures code quality on every push and pull request

## Known Issues

- **Data Persistence**: Currently only two rows of data from the database are displaying in the frontend, and new data is not being persisted.
- **Possible Causes**: 
  - Database connection configuration may need adjustment
  - Data fetching or state management in the frontend may need optimization
  - Docker container communication might need troubleshooting

These issues would be addressed in the next iteration of development.