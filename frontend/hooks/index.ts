export * from './ioc';
export * from './session';

import { useColorMode } from '@chakra-ui/react';

export const useDarkMode = () => {
    const { colorMode } = useColorMode();
    return colorMode == 'dark';
};
