import to from 'await-to-js';

export class BaseBackendClient {
    protected endpoint : string;
    protected axios : any;

    public constructor(endpoint : string, axios : any) {
        this.endpoint = endpoint;
        this.axios = axios;
    }

    private gqlPost = async (path: string, query: string, variables: any, headers : any = {}) : Promise<any> => {
        const [err, res] = await to(this.axios({
            method: 'POST',
            url: `${ this.endpoint }${ path }`,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            data: { query, variables }
        })) as any[];

        if (err) {
            throw err;
        } else if (res.errors) {
            throw res.errors;
        } else if (!res.data || !res.data.data) {
            throw res;
        } else {
            return res.data.data;
        }
    };

    protected gqlV0 = async (query: string, variables: any) : Promise<any> => {
        return this.gqlPost('/v0/graphql', query, variables);
    };

    protected gqlV1 = async (query: string, variables: any) : Promise<any> => {
        return this.gqlPost('/v1/graphql', query, variables);
    };
}
