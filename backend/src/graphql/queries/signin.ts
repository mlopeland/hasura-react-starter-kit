import to from 'await-to-js';

import { ContextContainer, ContextIoC } from '../../helpers';

export class SigninQuery {
    private ioc: ContextIoC;
    private bcrypt: any;

    constructor(ioc: ContextIoC, bcrypt: any) {
        this.ioc = ioc;
        this.bcrypt = bcrypt;
    }

    public signin = async (input: any, ctx: ContextContainer) => {
        const { email, password } = input;
        const [err, user] = await to(this.ioc.userClient.findUserByEmail(email));
        if (err) {
            throw err;
        } else if (!user) {
            throw 'wrong credentials';
        } else if (user.password_hash == this.bcrypt.hashSync(password, user.password_hash)) {
            const token = this.ioc.jwtService.build(user);
            ctx.res.cookie('t', token);
            return user;
        } else {
            throw 'wrong credentials';
        }
    };
}
