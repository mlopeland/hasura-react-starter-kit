import React, { 
    useState, 
    useMemo, 
    useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react';
import cookie from 'cookie';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

interface ISession {
    token: string | undefined,
    setToken: any,
    deleteSession: any,
}

const SessionContext = createContext<ISession>({
    token: undefined,
    setToken() {},
    deleteSession() {},
});

const useSessionHook = (): ISession => {
    const [token, setToken] = useState<string | undefined>();
    const router = useRouter();
    const toast = useToast();
    let deleteSession = () => {};
    if (typeof document !== 'undefined') {
        let stored: any = cookie.parse(document.cookie);
        useEffect(() => {
            if (stored && stored.t) {
                setToken(stored.t);
            }
        }, [ stored ]);
        deleteSession = useCallback(() => {
            document.cookie = cookie.serialize('t', undefined);
            router.push('/');
            toast({
                title: 'Session closed',
                description: "You've succesfully closed your session",
                position: 'top-right',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }, []);
    }
    return useMemo(() => 
        ({ token, setToken, deleteSession }), 
         [ token, setToken, deleteSession ]
    );
};

interface ISessionProviderProps {
    children: React.ReactElement | React.ReactElement[],
}

export const SessionProvider = (props: ISessionProviderProps) => {
    const hook = useSessionHook();
    return (
        <SessionContext.Provider value={ hook }>
            { props.children }
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    return useContext(SessionContext);
};
