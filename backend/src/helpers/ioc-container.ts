import { UserClient } from '../clients/users';
import { JwtService } from './jwt-service';
import { AuthService } from './auth-service';

export class ContextContainer {
    public req: any;
    public res: any;

    constructor(req: any, res: any) {
        this.req = req;
        this.res = res;
    }
}

export class ContextIoC {
    public userClient : UserClient;
    public jwtService : JwtService;
    public authService : AuthService;

    public constructor(
        userClient: UserClient,
        jwtService: JwtService,
        authService: AuthService) {
        
            this.userClient = userClient;
            this.jwtService = jwtService;
            this.authService = authService;
    }
}
