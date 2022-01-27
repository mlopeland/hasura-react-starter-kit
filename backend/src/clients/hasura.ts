import { GraphQLClient, gql } from 'graphql-request';

export class HasuraClient {
    private client : GraphQLClient;

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    protected request = async (query: string, variables : any = undefined) => {
        const data = await this.client.request(gql`${ query }`, variables);
        return data;
    };
}
