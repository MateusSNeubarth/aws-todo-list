# To-Do List Application

This is a simple **To-Do List** application built with Node.js, Express, Prisma ORM, and PostgreSQL. The app allows users to create, view, and manage their to-do tasks. The project is containerized with Docker for easier deployment, and it's set up to be hosted on AWS.

## Features

- User authentication and task management
- Relational database using Prisma ORM with PostgreSQL
- RESTful API built with Express.js
- Dockerized for easy container deployment
- Ready for cloud deployment on AWS

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to create API routes and handle requests.
- **Prisma ORM**: Provides an easy way to manage the PostgreSQL database and handle migrations.
- **PostgreSQL**: The relational database for storing users and tasks.
- **Docker**: For containerizing the application, making it easy to deploy and scale.
- **AWS**: Hosting the application and PostgreSQL database on Amazon Web Services.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file with the following environment variables:
   ```bash
   DATABASE_URL="your_postgresql_connection_string"
4. Run database migrations:
   ```bash
   npx prisma migrate dev
5. Build and run the application with Docker:
   ```bash
   docker-compose up --build
6. Open the application on your local machine:
   ```bash
   http://localhost:8800
  
## API Endpoints

- `POST /api/auth/register`: Create a new user.
- `POST /api/auth/login`: Authenticate a user.
- `POST /api/todo/:user_id`: Create a new to-do task.
- `GET /api/todo/:user_id`: Get all to-do tasks for the user.
- `DELETE /api/todo/:id`: Delete a to-do task.

## Deployment on AWS

You can easily deploy this application to AWS using services like **Elastic Beanstalk** or **EC2** for hosting the application and **RDS** for managing the PostgreSQL database. Make sure to configure the environment variables properly for AWS.

## Contact

Feel free to suggest improvements or report bugs! You can reach me on LinkedIn:

- [Mateus's LinkedIn](https://www.linkedin.com/in/mateus-neubarth/)
