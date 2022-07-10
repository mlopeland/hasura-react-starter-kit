import React from 'react';
import {
    Grid,
    GridItem,
    Stack,
    Box,
    Center,
    Spacer,
    Container,
} from '@chakra-ui/react';

interface ISpaLayoutProps {
    children: React.ReactElement | React.ReactElement[],
}

export const SpaLayout = (props: ISpaLayoutProps) => {
    const { children } = props;
    return (
        <Stack direction="column">
            <Box>
                <Container maxW="container.lg">
                    <Stack direction="row" height="70px">
                        <Center>
                            Logo
                        </Center>
                        <Spacer />
                        <Center>
                            Right menu
                        </Center>
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
