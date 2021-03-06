import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import to from 'await-to-js';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Center,
    Text,
    useToast
} from '@chakra-ui/react';

import { PublicLayout } from "../components/layouts";
import { IocContext, useDarkMode } from '../hooks';

const useSigninHook = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasErrors, setHasErrors] = useState(false);
    const [hasSuccess, setHasSuccess] = useState(false);
    const ioc = useContext(IocContext);
    const router = useRouter();
    const toast = useToast();
    // const signedIn = isSignedIn();

    const onClickSignin = async () => {
        setHasSuccess(false);
        setHasErrors(false);
        const [err, signin] = await to(ioc.unauthenticatedClient.signIn(email, password));
        if (!err && signin === true) {
            setHasSuccess(true);
            router.push('/spa/');
            toast({
                title: 'Welcome back',
                description: `Succesfully signed in with email ${ email }`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            setHasErrors(true);
        }
    };

    return { email, setEmail, password, hasErrors, setHasErrors, setPassword, onClickSignin, hasSuccess };
};

const Signin : NextPage = () => {
    const hook = useSigninHook();
    const isDarkMode = useDarkMode();
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
                    borderColor={ isDarkMode ? "gray.700" : "gray.200" }
                >
                    <Text fontSize="lg">Sign in</Text>

                    <Box h="15px"/>
                    
                    <FormControl isInvalid={ hook.hasErrors }>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" type="email" fontSize="xs" value={ hook.email } 
                            onChange={ e => hook.setEmail(e.target.value) } />
                    </FormControl>

                    <Box h="15px"/>

                    <FormControl isInvalid={ hook.hasErrors }>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input id="password" type="password" value={ hook.password } 
                            onChange={ e => hook.setPassword(e.target.value) } />
                        { hook.hasErrors ? (
                            <FormErrorMessage>Wrong credentials</FormErrorMessage>
                        ) : undefined }
                    </FormControl>

                    <Box h="15px"/>

                    <Flex direction="column">
                        <Button w="100%" onClick={ hook.onClickSignin }>Login</Button>
                        <Box h="15px"/>
                        <Link href="/signup">
                            <Button w="100%" variant="outline">Create new account</Button>
                        </Link>
                    </Flex>
                </Flex>
            </Center>
        </PublicLayout>
    );
}

export default Signin;
