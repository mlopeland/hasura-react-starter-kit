export * from './mutations';
export * from './queries';
export * from './schema';

import { SignupMutation } from './mutations';
import { SigninQuery } from './queries';

export const buildRootValue = (
    signup: SignupMutation,
    signin: SigninQuery,
) => {
    return {
        signin: signin.signin,
        signup: signup.signup,
    };
};
