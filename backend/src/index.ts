import express from 'express';
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { schema, buildRootValue } from './graphql';
import { UserClient } from './clients';
import { JwtService, ContextContainer, ContextIoC, AuthService } from './helpers';
import { SigninQuery, SignupMutation } from './graphql';

const PORT = 8080;
const HASURA = 'hasura:8080';
const KEY = JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET || '')['key'];
const app = express();
const graphqlClient = new GraphQLClient(`http://${ HASURA }/v1/graphql`, {
    headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
    }
});

// Client & Services
const userClient = new UserClient(graphqlClient);
const jwtService = new JwtService(jwt, KEY);
const authService = new AuthService(jwtService);
const contextIoC = new ContextIoC(userClient, jwtService, authService);

// Query & Mutations
const signinQuery = new SigninQuery(contextIoC, bcrypt);
const signupMutation = new SignupMutation(contextIoC, bcrypt);

const rootValue = buildRootValue(signupMutation, signinQuery);

// middlewares
app.use(cookieParser());
app.use('/v0/graphql', graphqlHTTP((req: any, res: any) => 
    ({ schema, rootValue, context: new ContextContainer(req, res) })));

// routing
app.post('/v1/graphql', proxy(`${ HASURA }/v1/graphql`));

app.listen(PORT, () => console.log("[server] Ready"));
