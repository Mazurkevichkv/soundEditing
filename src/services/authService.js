import Cookies from 'universal-cookie';

const cookies = new Cookies();

const authService = {
    isAuthenticated() {
        return cookies.get('auth') === 'true';
    },

    singIn() {
        cookies.set('auth', true, { path: '/' });
    },

    singOut() {
        cookies.set('auth', false, { path: '/' });
    }
};

export default authService;
