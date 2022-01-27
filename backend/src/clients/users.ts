import to from 'await-to-js';
import { HasuraClient } from './hasura';

export class UserClient extends HasuraClient {
    public findUserByEmail = async (email: String): Promise<any> => {
        const [err, user] = await to(this.request(`
            query {
                users_by_pk(email: "${ email }") {
                    id
                    email
                    password_hash
                    password_salt
                }
            }
        `));

        if (err) {
            throw err;
        }

        return user.users_by_pk;
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
}
