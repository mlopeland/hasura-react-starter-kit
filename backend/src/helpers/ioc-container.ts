import { UserClient } from '../clients/users';
import { JwtService } from './jwt-service';
import { AuthService } from './auth-service';

export class ContextContainer {
    public req: any;
    public res: any;
    public ioc: ContextIoC;

    constructor(req: any, res: any, ioc: ContextIoC) {
        this.req = req;
        this.res = res;
        this.ioc = ioc;
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
