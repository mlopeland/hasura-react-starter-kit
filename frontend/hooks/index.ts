export * from './ioc';
export * from './session';

import { useState, useCallback, useMemo } from 'react';
import { useColorMode } from '@chakra-ui/react';

export const useDarkMode = () => {
    const { colorMode } = useColorMode();
    return colorMode == 'dark';
};

export const useToggle = (init: boolean): [boolean, () => void] => {
    const [state, setState] = useState<boolean>(init);
    const toggle = useCallback(() => setState(!state), [ state, setState ]);
    return useMemo(() => ([ state, toggle ]), [ state, toggle ]);
};
