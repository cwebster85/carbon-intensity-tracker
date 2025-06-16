# Full Stack Developer Technical Interview Test — Carbon Intensity Tracker

## 📋 Instructions

**Please read the instructions carefully.**

You are required to build a full stack web application that allows users to 
read DONE
update DONE
delete DONE
store TODO
national carbon intensity values in front end application. 
Use the provided mock data to build the application.

## 🧪 Data
- The mock data in `carbon-intensity-data.csv` should be used to seed the database during initial setup. TO DO WHEN SETTING UP HOST DB
- Carbon intensity values are in grams of CO2 per kWh DONE
- Fuel mix data is in percentage of total generation - DONE (last row removed as this appears to be an accidental summation of the fuel percentage rows with no table header)

## 🔧 Technology Stack & Project Requirements

- Backend: Node.js with Express (or preferably C# ASP.NET) DONE
- Frontend: React or SvelteKit DONE
- Containerization: Docker DONE
- Database: PostgreSQL (or SQLite for simplicity) with ORM preferred
ADDED SEQUELIZE
BUILD IT UP WITH MODEL/MIGRATION/SEED AND
DATA READING ONCE CONNECTED TO POSTGRES DB

NOW TO ADD DB..NEED TO ENSURE IT WORKS IN DOCKER CONTAINER TOO

- Version Control: Git (GitHub/GitLab) DONE
- Types: TypeScript where possible DONE
- Testing: Unit and integration tests using Jest, Mocha/Chai (or equivalent in C#) 
DONE FOR GET AND POST REQUEST


- A README must be included, detailing:
  - Setup instructions
  - Local development and Docker usage

### 💾 Backend

- API server to interact with front end DONE
- Persistent storage in database TODO
- Error handling and input validation DONE
- Ensure appropriate HTTP status codes are returned 
DONE
- Modular code structure with separation of concerns DONE

### 🌐 Frontend

- Fetch data from the backend API DONE
- UI for interacting with the API
- Ability to 
view, DONE
add, DONE
edit, DONE
and 
delete DONE
carbon intensity values

- Back end response validation and error feedback

### 🧪 Test Coverage Expectations

- Minimum 2–3 unit or integration tests
- Describe tools used and why
- Consider edge cases and error flows 


### ⚙️ DevOps & CI/CD

- Docker setup should have all services containerized
- Run linter and formatter in the CI/CD pipeline

### 📦 Optional/Nice-To-Have Tasks

You can choose to implement any of these to demonstrate advanced skill.

- Carbon Intensity API Integration **(see below)**
- CI/CD build docker image and store as artifact
- Bash script to automate setup, build and run docker containers
- Use GitLab/GitHub hooks to run pre commit/pre push actions
- Run tests as part of the pipeline
- Rate limiter/middleware
- Websockets for real-time data transmission
- Export data as CSV/JSON for selected date range
- Ability to sort tables by column
- Tables are paginated
- Use a charting library (e.g., Chart.js, D3.js) to visualize data
- API documentation using Swagger
- **Any other feature you think would be useful, interesting, improve security, UI/UX, or performance**

### 🔌 **Carbon Intensity API Integration**

Website: https://carbonintensity.org.uk/ 

Required Endpoints:

- GET /intensity
- GET /generation
- GET /intensity/date

Task Requirements:

- Fetch current carbon intensity values 
- Fetch current fuel mix (generation) values
- On new data event merge and store carbon intensity + fuel mix data
- Display historical data (default: 12 hours, configurable date range)
