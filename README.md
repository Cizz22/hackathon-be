# Hackaton Study Case Web Application

this is API Hackaton study case

the primary goal of this API is to provide Glossy Gift website with a required functionality to manage orders.


You can access the API from [here](https://hackthon.fly.dev/)

Check documentation for more details. [API Documentation](https://documenter.getpostman.com/view/15990109/2s9YJW4kiv)

## Table of Contents

1. [Dependencies](#dependencies)
2. [Getting Started](#getting-started)
3. [Database](#database)
4. [Application Structure](#application-structure)
5. [Development](#development)

## Dependencies

- [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database

## Getting Started

First, clone the project:

```bash
$ git clone https://github.com/Cizz22/final-project.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies and check that it works

```bash
$ npm install                   # Install project dependencies
```

Start the server

```bash
$ npm start                     # Compile and launch
```

if everything works, you should able to access the API from http://localhost:3000

## Database

This project uses PostgreSQL as database. You can download it from [here](https://www.postgresql.org/download/)

## Application Structure

.
├── prisma # Prisma ORM
│ ├── migrations # Database migrations
│ ├── schema.prisma # Prisma schema file
├── src # Application source code
│ ├── app.ts # Express application
│ ├── controllers # Controllers
│ ├── routes # Routes
│ ├── utils
