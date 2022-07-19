import to from 'await-to-js';

import { ContextContainer, ContextIoC } from "../../helpers";

export class SignupMutation {
    private ioc: ContextIoC;
    private bcrypt: any;
    
    constructor(ioc: ContextIoC, bcrypt: any) {
        this.ioc = ioc;
        this.bcrypt = bcrypt;
    }

    public signup = async (input: any, ctx: ContextContainer) => {
        const { email, password } = input;
        const password_salt = this.bcrypt.genSaltSync(10);
        const password_hash = this.bcrypt.hashSync(password, password_salt);
        const [err, created] = await to(this.ioc.userClient
            .createUser({ email, password_salt, password_hash }));
        if (err) {
            throw err;
        }
        return created;
    };
}
