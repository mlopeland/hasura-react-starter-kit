import { User } from "../models";

export const HASURA_CLAIMS = 'https://hasura.io/jwt/claims';
export const HASURA_USER_ID = 'x-hasura-user-id';

export class JwtService {
    private jwt: any;
    private secret : string;
    private config : any;

    public constructor(jwt: any, secret: string) {
        this.jwt = jwt;
        this.secret = secret;
        this.config = {
            algorithm: 'HS256'
        };
    }

    public build = (user: User): string => {
        const payload = {
            email: user.email,
            [HASURA_CLAIMS]: {
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-default-role": "user",
                [HASURA_USER_ID]: user.id
            }
        };
        return this.jwt.sign(payload, this.secret, this.config);
    };

    public verify = (token: string): boolean => {
        return this.jwt.verify(token, this.secret, this.config);
    };

    public extractPayload = (token: string): any => {
        
    };
}