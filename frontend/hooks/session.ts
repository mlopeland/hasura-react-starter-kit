import cookie from 'cookie';

export const isSignedIn = () => {
    const cookies = document.cookie;
    console.log(cookie.parse(cookies));
};