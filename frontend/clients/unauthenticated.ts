import to from "await-to-js";
import { BaseBackendClient } from "./base-backend";

export class UnAuthenticatedClient extends BaseBackendClient {
    public signIn = async (email : string, password : string) : Promise<boolean> => {
        const [err, res] = await to(this.gqlV0(`
            mutation signin($email: String, $password: String) {
                signin(email: $email, password: $password) {
                    email
                }	
            }
        `, { email, password }));
        
        return (!err && res && res.signin && res.signin.email === email);
    };

    public signUp = async (email : string, password : string) : Promise<boolean> => {
        const [err, res] = await to(this.gqlV0(`
            mutation signup($email: String, $password: String) {
                signup(email: $email, password: $password) {
                    email
                }	
            }
        `, { email, password }));

        return (!err && res && res.signup && res.signup.email === email);
    };
}