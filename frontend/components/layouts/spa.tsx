import React from 'react';
import {
    Stack,
    Box,
    Center,
    Spacer,
    Container,
    Button,
    useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MdDarkMode } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';

import { useSession } from '../../hooks';

interface ISpaLayoutProps {
    children: React.ReactElement | React.ReactElement[],
}

export const SpaLayout = (props: ISpaLayoutProps) => {
    const { toggleColorMode } = useColorMode();
    const { children } = props;
    const { deleteSession } = useSession();
    return (
        <Stack direction="column">
            <Box>
                <Container maxW="container.lg">
                    <Stack direction="row" height="70px">
                        <Center>
                            <Link href="/spa">Hasura React Template</Link>
                        </Center>
                        <Spacer />
                        <Stack direction="row">
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
                    </Stack>
                </Container>
            </Box>
            <Box>
                <Container maxW="container.lg">
                    <Box>
                        { children }
                    </Box>
                </Container>
            </Box>
        </Stack>
    );
};
