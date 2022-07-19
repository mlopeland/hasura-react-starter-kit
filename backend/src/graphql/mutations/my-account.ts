import { ContextContainer } from "../../helpers";

interface IChangePassword {
    password: String | undefined,
    passwordRepeat: String | undefined,
}

export const changePassword = async (input: IChangePassword, context: ContextContainer) => {
    const { req, ioc } = context;
    const { password, passwordRepeat } = input;
    console.log(req.headers);
};
