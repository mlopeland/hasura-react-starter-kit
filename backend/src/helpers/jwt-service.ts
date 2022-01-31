import jwt from 'jsonwebtoken';

export class JwtService {
    private secret : string;
    private config : any;

    public constructor(secret: string) {
        this.secret = secret;
        this.config = {
            algorithm: 'HS256'
        };
    }

    public build = (user: any) => {
        const payload = {
            email: user.email,
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": user.id
            }
        };
        return jwt.sign(payload, this.secret, this.config);
    };

    public verify = (token: string) => {
        return jwt.verify(token, this.secret, this.config);
    };
}