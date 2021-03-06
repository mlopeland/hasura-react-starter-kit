import { NextPage } from 'next';
import Link from 'next/link';
import { useContext, useState } from 'react';
import to from 'await-to-js';
import {
    Alert, 
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Center,
    Text
} from '@chakra-ui/react';

import { PublicLayout } from "../components/layouts";
import { IocContext, useDarkMode } from '../hooks';

const useSignupHook = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasErrors, setHasErrors] = useState(false);
    const [hasSuccess, setHasSuccess] = useState(false);
    const ioc = useContext(IocContext);

    const onClickSignup = async () => {
        setHasSuccess(false);
        setHasErrors(false);
        const [err, signin] = await to(ioc.unauthenticatedClient.signUp(email, password));
        if (!err && signin === true) {
            setHasSuccess(true);
            // Redirect to signed in page
        } else {
            setHasErrors(true);
        }
    };

    return { email, setEmail, password, hasErrors, setHasErrors, setPassword, onClickSignup, hasSuccess };
};

const Signup : NextPage = () => {
    const hook = useSignupHook();
    const darkMode = useDarkMode();
    return (
        <PublicLayout>
            <Box h="100px" />
            <Center>
                <Flex 
                    direction="column" 
                    maxW="400px" 
                    border="1px" 
                    padding="20px 30px" 
                    paddingBottom="30px"
                    borderRadius="4px" 
                    borderColor={ darkMode ? "gray.700" : "gray.200" }
                >
                    <Text fontSize="lg">Register new account</Text>

                    <Box h="15px"/>

                    { hook.hasErrors ? (
                        <>
                            <Alert status="error">
                                <AlertIcon />
                                <AlertTitle>Something went wrong</AlertTitle>
                                <CloseButton position="absolute" right="8px" top="8px" 
                                    onClick={ e => hook.setHasErrors(false) }/>
                            </Alert>
                            <Box h="15px"/>
                        </>
                    ) : undefined }

                    { hook.hasSuccess ? (
                        <>
                            <Alert status="success">
                                <AlertIcon />
                                <AlertTitle>Successfully registered</AlertTitle>
                            </Alert>
                            <Box h="15px"/>
                        </>
                    ) : undefined }

                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" type="email" fontSize="xs" value={ hook.email } 
                            onChange={ e => hook.setEmail(e.target.value) } />
                    </FormControl>

                    <Box h="15px"/>

                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input id="password" type="password" value={ hook.password } 
                            onChange={ e => hook.setPassword(e.target.value) } />
                    </FormControl>

                    <Box h="15px"/>

                    <Flex direction="column">
                        <Button w="100%" onClick={ hook.onClickSignup }>Register</Button>
                        <Box h="15px"/>
                        <Link href="/signin">
                            <Button w="100%" variant="outline">
                                Already have an account?
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Center>
        </PublicLayout>
    );
}

export default Signup;
