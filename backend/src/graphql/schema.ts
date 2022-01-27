import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type Query {
        hello: String
    }    

    type User {
        email: String
    }    

    type Mutation {
        signup(email: String, password: String): User
        signin(email: String, password: String): User
    }
`);