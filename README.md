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
npm run dev
```

For a better experience, have two separate terminals running with backend and frontend. The frontend now should be exposed through a graphql API in `localhost:8081` and the frontend should be present as a next.js app running at `localhost:8082`. The `8080` also exposes the Hasura port, you can play with the `docker-compose` file to expose as many ports as you need.

Your `docker ps` command should show something like this

```
% docker-compose ps
              Name                            Command               State           Ports         
--------------------------------------------------------------------------------------------------
hasura-react-template_backend_1    docker-entrypoint.sh /bin/ ...   Up                            
hasura-react-template_frontend_1   docker-entrypoint.sh /bin/ ...   Up                            
hasura-react-template_hasura_1     graphql-engine serve             Up      0.0.0.0:8081->8080/tcp
hasura-react-template_nginx_1      /docker-entrypoint.sh ngin ...   Up      0.0.0.0:8080->80/tcp  
hasura-react-template_postgres_1   docker-entrypoint.sh postgres    Up      5432/tcp
```
