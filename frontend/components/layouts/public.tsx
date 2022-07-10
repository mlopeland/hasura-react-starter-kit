import Link from 'next/link';
import { 
    Box, 
    Button, 
    Center, 
    Container, 
    Flex, 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuList, 
    Text,
    Stack,
    useColorMode,
} from '@chakra-ui/react';
import { MdDarkMode } from 'react-icons/md';

import publicLayoutStyles from '../../styles/PublicLayout.module.css'

export const PublicLayout = (props: any) => {
    const { toggleColorMode } = useColorMode();
    const { children } = props;
    return (
        <Box>
            <Flex align="center" minH="80px">
                <Container maxW="container.xl">
                    <Flex>
                        <Center minW="150px">
                            <Text>Logo</Text>
                        </Center>
                        <Flex grow="1">
                            { MENUS.map((menu, idx) => (
                                <Flex key={ idx } pr="20px">
                                    <Menu>
                                        <MenuButton>{ menu.title }</MenuButton>
                                        <MenuList>
                                            { menu.items.map((item, idx) => (
                                                <MenuItem key={ idx }>
                                                    <Flex direction="column">
                                                        <Text>{ item.title }</Text>
                                                        <Text fontSize="xs">{ item.description }</Text>
                                                    </Flex>
                                                </MenuItem>
                                            )) }
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            )) }
                        </Flex>
                        <Stack direction="row">
                            <Center>
                                <Button variant="link" onClick={ toggleColorMode }>
                                    <MdDarkMode />
                                </Button>
                            </Center>
                            <Center>
                                <Link href="/signin">Login</Link>
                            </Center>
                        </Stack>
                    </Flex>
                </Container>
            </Flex>
            <Flex>
                <Container maxW="container.xl">
                    <div className={ publicLayoutStyles.children }>{ children }</div>
                </Container>
            </Flex>
        </Box>
    );
};

interface IMenuItem {
    title: string;
    description: string;
}

interface IMenu {
    title: string;
    items: IMenuItem[];
}

const MENUS : IMenu[] = [
    {
        title: 'Our company',
        items: [
            {
                title: 'Features',
                description: 'Some simple description of what are the features'
            },
            {
                title: 'Terms',
                description: 'Some simple description of what are the terms and conditions'
            }
        ]
    },
    {
        title: 'Photos',
        items: [
            {
                title: 'Sample',
                description: 'Some sample photos of your buesiness'
            },
            {
                title: 'Products',
                description: 'Some sample photos of your products'
            },
            {
                title: 'Services',
                description: 'Some sample photos of your services'
            }
        ]
    },
    {
        title: 'Contact Us',
        items: [
            {
                title: 'Email',
                description: 'How to write us through email'
            },
            {
                title: 'Social',
                description: 'Links to our social networks'
            }
        ]
    }
];

