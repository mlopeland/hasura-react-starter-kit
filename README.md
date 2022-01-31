# Hasura React Starter-kit

This repository aims to be the starting commit of any project with the following technology stack

- Docker
- TypeScript
- Postgres
- Hasura
- Next.js
- React

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

Enter the backend container shell, install the dependencies and run the server

```
docker-compose exec backend sh
npm install
npm start
```

Enter the frontend container shell, install the dependencies and run the next.js server

```
docker-compose exec frontend sh
npm install 
npm run build
npm start
```

For a better experience, have two separate terminals running with backend and frontend. The frontend now should be exposed through a graphql API in `localhost:8081` and the frontend should be present as a next.js app running at `localhost:8082`.

Your `docker ps` command should show something like this

```
% docker ps
CONTAINER ID   IMAGE                            COMMAND                  CREATED          STATUS          PORTS                    NAMES
a383d22777c7   hasura/graphql-engine:v2.1.1     "graphql-engine serve"   42 seconds ago   Up 40 seconds   0.0.0.0:8080->8080/tcp   hasura-react-template_hasura_1
f17526fbdc3a   postgres:12                      "docker-entrypoint.s…"   43 seconds ago   Up 42 seconds   5432/tcp                 hasura-react-template_postgres_1
86c55873942c   hasura-react-template_frontend   "docker-entrypoint.s…"   19 minutes ago   Up 2 seconds    0.0.0.0:8082->3000/tcp   hasura-react-template_frontend_1
e89f451ec739   hasura-react-template_backend    "docker-entrypoint.s…"   3 days ago       Up 3 seconds    0.0.0.0:8081->8080/tcp   e89f451ec739_hasura-react-template_backend_1
```
