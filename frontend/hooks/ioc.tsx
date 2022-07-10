import { createContext } from 'react';
import axios from 'axios';

import { UnAuthenticatedClient } from '../clients';

const iocInitialValue = {
    unauthenticatedClient: new UnAuthenticatedClient('http://localhost:8080/api', axios)
};

export const IocContext = createContext(iocInitialValue);

export const IocProvider = (props: any) => {
    return (
        <IocContext.Provider value={ iocInitialValue }>
            { props.children }
        </IocContext.Provider>
    );
};
