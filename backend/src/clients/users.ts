import to from 'await-to-js';
import { HasuraClient } from './hasura';

export class UserClient extends HasuraClient {
    public findUserByEmail = async (email: String): Promise<any> => {
        const [err, user] = await to(this.request(`
            query {
                users(where: { email: { _eq: "${ email }" } }, limit: 1) {
                    id
                    email
                    password_hash
                    password_salt
                }
            }
        `));

        if (err) {
            throw err;
        } else if (!user || !user.users || user.users.length != 1) {
            throw 'User not found';
        }

        return user.users[0];
    };

    public createUser = async (input: any) : Promise<any> => {
        const [err, created] = await to(this.request(`
            mutation createUser($input: users_insert_input!) {
                insert_users_one(object: $input) {
                    id
                    email
                }
            }
        `, { input }));

        if (err) {
            throw err;
        }

        return created.insert_users_one;
    }

    public changePassword = async (
        email: String,
        password: String,
        passwordRepeat: String,
    ) => {
        
    };
}
