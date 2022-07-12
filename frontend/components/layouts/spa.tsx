import React from 'react';
import {
    Stack,
    Box,
    Center,
    Container,
    Spacer,
    Button,
    useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useNavigate } from 'react-router-dom';
import { MdDarkMode } from 'react-icons/md';
import { BiExit, BiMenu, BiHomeSmile } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';

import { useSession, useToggle } from '../../hooks';

interface ISpaLayoutProps {
    children: React.ReactElement | React.ReactElement[],
}

export const SpaLayout = (props: ISpaLayoutProps) => {
    const { toggleColorMode } = useColorMode();
    const { children } = props;
    const { deleteSession } = useSession();
    const [mobileMenu, toggleMobileMenu] = useToggle(false);
    return (
        <Stack direction="column">
            <Box>
                <Container maxW="container.lg">
                    <Stack direction="row" height="70px">
                        <Center>
                            <Link href="/spa">Hasura React Template</Link>
                        </Center>
                        <Spacer />
                        <Stack direction="row" display={ { base: 'none', lg: 'inherit' } }>
                            <Center>
                                <Button variant="link" onClick={ toggleColorMode }>
                                    <MdDarkMode />
                                </Button>
                            </Center>
                            <Center>
                                <Button 
                                    variant="outline" 
                                    leftIcon={ <BiExit /> }
                                    onClick={ deleteSession }
                                >
                                    Sign out
                                </Button>
                            </Center>
                        </Stack>
                        <Center display={ { base: 'inherit', lg: 'none' } }>
                            <Button 
                                variant="outline" 
                                onClick={ toggleMobileMenu }
                            >
                                <BiMenu />
                            </Button>
                            <MobileMenu 
                                visible={ mobileMenu } 
                                onClose={ toggleMobileMenu } 
                            />
                        </Center>
                    </Stack>
                </Container>
            </Box>
            <Box>
                <Container maxW="container.lg">
                    <Stack direction="row" w="100%" spacing={ 0 }>
                        <Box 
                            display={ { base: 'none', lg: 'inherit' } }
                            pr="30px"
                        >
                            <Menu />
                        </Box>
                        <Box>
                            { children }
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Stack>
    );
};

interface IMobileMenuProps {
    visible: boolean | undefined,
    onClose: () => void,
}

const MobileMenu = (props: IMobileMenuProps) => {
    const { visible, onClose } = props;
    return (
        <Box 
            display={ visible ? 'inherit' : 'none' }
            position="absolute"
            w="100%"
            h="100%"
            top="0"
            left="0"
            bg="gray.600"
        >
            <Stack 
                direction="column" 
                w="100%"
                p="0px 15px"
            >
                <Stack direction="row" height="70px">
                    <Box></Box>
                    <Spacer />
                    <Center>
                        <Button
                            variant="outline"
                            onClick={ onClose }
                        >
                            <AiOutlineClose />
                        </Button>
                    </Center>
                </Stack>
                <Box>
                    <Menu />
                </Box>
            </Stack>
        </Box>
    );
};

const Menu = () => {
    const navigate = useNavigate(); // Change by link
    return ( 
        <Stack direction="column" w="100%" minW="150px" spacing="20px">
            <Box>
                <Button variant="link" leftIcon={ <BiHomeSmile/> } onClick={ () => navigate('/') }>
                    Home
                </Button>
            </Box>
            <Box borderBottom="1px solid" borderColor="gray.700"></Box>
            <Box>
                <Button variant="link" leftIcon={ <AiOutlineUser/> } onClick={ () => navigate('/my-account') }>
                    My account
                </Button>
            </Box>
        </Stack>
    );
};
