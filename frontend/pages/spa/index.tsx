import { NextPage } from "next";

import { SpaLayout } from "../../components/layouts";

const Spa = () => {
    return (
        <SpaLayout>
            <>SpaContent</>
        </SpaLayout>
    );
};

const Index : NextPage = () => {
    return (
        <div suppressHydrationWarning>
            { typeof window === 'undefined' ? undefined : <Spa /> }
        </div>
    );
};

export default Index;
