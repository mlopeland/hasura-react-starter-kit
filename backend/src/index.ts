import express from 'express';
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLClient } from 'graphql-request';
import cors from 'cors';

import { schema, rootValue } from './graphql';
import { UserClient } from './clients';
import { JwtService, ContextContainer, ContextIoC } from './helpers';

const PORT = 8080;
const HASURA = 'hasura:8080';
const KEY = JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET || '')['key'];
const app = express();
const graphqlClient = new GraphQLClient(`http://${ HASURA }/v1/graphql`, {
    headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
    }
});
const userClient = new UserClient(graphqlClient);
const jwtService = new JwtService(KEY);
const contextIoC = new ContextIoC(userClient, jwtService);

// middlewares
app.use(cors()); // dev only
app.use(cookieParser());
app.use('/v0/graphql', graphqlHTTP((req: any, res: any) => 
    ({ schema, rootValue, context: new ContextContainer(req, res, contextIoC) })));

// routing
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.post('/v1/graphql', proxy(`${ HASURA }/v1/graphql`));

app.listen(PORT, () => console.log("[server] Ready"));
