import { UserClient } from '../clients/users';
import JwtService from '../services/jwt-service';

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

    public constructor(
        userClient: UserClient,
        jwtService: JwtService) {
        
            this.userClient = userClient;
            this.jwtService = jwtService;
    }
}
