import { User } from '../models';
import { ContextContainer } from './ioc-container';
import { JwtService, HASURA_CLAIMS, HASURA_USER_ID } from './jwt-service';

export class AuthService {
    private jwtService: JwtService;

    public constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    public authenticate = async (context: ContextContainer): Promise<User | undefined> => {
        const { req, ioc } = context;
        const token = this.extractTokenIfAny(context.req.authorization);
        if (token && this.jwtService.verify(token)) {
            const payload = this.jwtService.extractPayload(token);
            if (payload && 
                payload.email && 
                payload[HASURA_CLAIMS][HASURA_USER_ID]
            ) {
                return {
                    id: payload[HASURA_CLAIMS][HASURA_USER_ID],
                    email: payload.email,
                } as User;
            }
        }
        return undefined;
    }

    private extractTokenIfAny = (headerValue: string): string | undefined => {
        if (headerValue) {
            const parts = headerValue.split(' ');
            if (parts.length > 0) {
                const token = parts[parts.length - 1];
                return token;
            }
        }
        return;
    };
}