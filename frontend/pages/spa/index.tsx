import { NextPage } from "next";
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import { HomePage, MyAccountPage } from "../../components/pages";

const Spa = () => {
    return (
        <BrowserRouter basename="/spa">
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/my-account" element={ <MyAccountPage /> } />
            </Routes>
        </BrowserRouter>
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
