import React, { 
    useState, 
    useMemo, 
    useEffect,
    useContext,
    useCallback,
    createContext,
} from 'react';
import cookie from 'cookie';

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
        }, []);
    }
    return useMemo(() => ({ token, setToken, deleteSession }), [ token ]);
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
