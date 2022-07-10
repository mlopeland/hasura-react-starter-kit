import { NextPage } from "next";

const Spa = () => {
    return (
        <>SpaContent</>
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
