import to from 'await-to-js';
import bcrypt from 'bcrypt';
import { ContextContainer } from './context';

export * from './schema';
export * from './context';

export const rootValue = {
    signup: async (input: any, context: ContextContainer) : Promise<any> => {
        const { email, password } = input;

        const password_salt = bcrypt.genSaltSync(10);
        const password_hash = bcrypt.hashSync(password, password_salt);

        const [err, created] = await to(context.ioc.userClient
            .createUser({ email, password_salt, password_hash }));
        if (err) {
            throw err;
        }
        
        return created;
    },

    signin: async (input: any, context: ContextContainer) : Promise<any> => {
        const { email, password } = input;

        const [err, user] = await to(context.ioc.userClient.findUserByEmail(email));
        if (err) {
            throw err;
        } else if (!user) {
            throw 'wrong credentials';
        } else if (user.password_hash == bcrypt.hashSync(password, user.password_hash)) {
            const token = context.ioc.jwtService.build(user);
            context.res.cookie('t', token);
            return user;
        } else {
            throw 'wrong credentials';
        }
    }
}
