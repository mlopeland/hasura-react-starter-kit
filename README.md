# Hasura React Starter-kit

This repository aims to be the starting commit of any project with the following technology stack

- Postgres
- Hasura
- React Web Application & any graphql compatible frontend

### Requirements

- Docker

### Getting started

Copy or modify the `.env` file

```
cp .env-example .env
```

Build the containers

```
docker-compose up -d
```

Enter the backend's container shell, install the dependencies and run the server

```
docker-compose exec backend sh
npm install
npm start
```
