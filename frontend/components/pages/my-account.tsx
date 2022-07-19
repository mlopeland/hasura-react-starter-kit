import { useState, useCallback, useMemo } from 'react';
import { 
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Text,
    Button,
    useToast,
} from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

import { SpaLayout } from '../layouts';

export const MyAccountPage = () => {
    return (
        <SpaLayout>
            <>
                <Box mb="20px">
                    <Box display="inline-block" mr="10px">
                        <AiOutlineUser /> 
                    </Box>
                    My Account
                </Box>

                <FormControl w="100%">
                    <FormLabel>Email</FormLabel>
                    <Input type="text" disabled={ true } />
                </FormControl>

                <Box m="40px 0px" w="100%" borderBottom="1px solid" borderColor={ "gray.700" }></Box>
                
                <ChangePasswordForm />

            </>
        </SpaLayout>
    );
};

const useChangePasswordHook = () => {
    const [password, setPassword] = useState<string | undefined>();
    const [passwordRepeat, setPasswordRepeat] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const toast = useToast();
    const submit = useCallback(() => {
        if (password !== passwordRepeat) {
            setError("You have to repeat the same password, they don't match");
        } else if ((password?.length || 0) < 8) {
            setError("New password must have at least 8 characters");
        } else {
            setError(undefined);
            setPassword('');
            setPasswordRepeat('');
            toast({
                title: 'Success',
                description: 'The password has been updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        }
    }, [password, passwordRepeat, error, setPassword, setPasswordRepeat, setError, toast]);

    return useMemo(() => 
        ({ password, passwordRepeat, setPassword, setPasswordRepeat, error, submit }), 
         [ password, passwordRepeat, setPassword, setPasswordRepeat, error, submit ]
    );
};

const ChangePasswordForm = () => {
    const { password, passwordRepeat, setPassword, setPasswordRepeat, error, 
        submit } = useChangePasswordHook();
    return (
        <>
            <Text mb="20px">Change password</Text>
            <FormControl w="100%" mb="20px" isInvalid={ !!error }>
                <FormLabel>New password</FormLabel>
                <Input 
                    type="password" 
                    value={ password }
                    onChange={ e => setPassword(e.target.value) }
                />
            </FormControl>
            <FormControl w="100%" mb="20px" isInvalid={ !!error }>
                <FormLabel>Repeat new password</FormLabel>
                <Input 
                    type="password" 
                    value={ passwordRepeat }
                    onChange={ e => setPasswordRepeat(e.target.value) } 
                />
                { !!error ? (<>
                    <FormErrorMessage>{ error }</FormErrorMessage>
                </>) : undefined }
            </FormControl>
            <Button colorScheme="green" onClick={ submit }>Change password</Button>
        </>
    );
};
