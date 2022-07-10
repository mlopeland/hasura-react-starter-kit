import Link from 'next/link';
import { 
    Box, 
    Button, 
    Center, 
    Container, 
    Stack,
    Spacer,
    useColorMode,
} from '@chakra-ui/react';
import { MdDarkMode } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';

import publicLayoutStyles from '../../styles/PublicLayout.module.css'
import { useSession } from '../../hooks';

export const PublicLayout = (props: any) => {
    const { toggleColorMode } = useColorMode();
    const { children } = props;
    const { token, deleteSession } = useSession();
    return (
        <Stack direction="column">
            <Box>
                <Container maxW="container.lg">
                    <Stack direction="row" height="70px">
                        <Center>
                        <Link href="/">Logo</Link>
                        </Center>
                        <Spacer />
                        <Stack direction="row">
                            <Center>
                                <Button variant="link" onClick={ toggleColorMode }>
                                    <MdDarkMode />
                                </Button>
                            </Center>
                            <Center>
                                { !token || token === 'undefined' ? 
                                    <Link href="/signin">Login</Link> 
                                : <>
                                    <Button 
                                        variant="outline" 
                                        leftIcon={ <BiExit /> }
                                        onClick={ deleteSession }
                                    >
                                        Sign out
                                    </Button>
                                </> }
                            </Center>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box>
                <Container maxW="container.lg">
                    <div className={ publicLayoutStyles.children }>{ children }</div>
                </Container>
            </Box>
        </Stack>
    );
};
