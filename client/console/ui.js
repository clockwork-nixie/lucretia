'use strict';

import Cookies from './cookies';

class Ui {
    constructor(api) {
        this.api = api;
    }


    initialise() {       
        this.readCookies();
        this.registerEvents();
    }


    readCookies() {
        const root = document.querySelector('#root')
        const loginName = document.querySelector('#loginUsername');
        const loginPassword = document.querySelector('#loginPassword');
        
        loginName.value = Cookies.get('username');

        (loginName.value? loginPassword: loginName).focus();

        if (Cookies.get('session')) {
            root.classList.add('logged-in');
        } else {
            root.classList.remove('logged-in');
        }

        if (Cookies.get('cookieDisclaimer') === "seen") {
            document.querySelector('.cookie-disclaimer').classList.add('hidden');
        }
    }


    registerEvents() {
        const self = this;
        const loginForm = document.querySelector('#login-panel form');
        const loginName = document.querySelector('#loginUsername');
        const loginPassword = document.querySelector('#loginPassword');
        const loginButton = document.querySelector('.login');
        const logoutButton = document.querySelector('.logout');
        const rememberMe = document.querySelector('#remember-me');
        
        loginButton.addEventListener('click', async (event) => {
            const timer = window.setTimeout(() => { self.showOverlay(true); }, 100)

            event.preventDefault();

            try {
                const sessionKey = await this.api.login(loginName.value, loginPassword.value);

                Cookies.setForever('username', rememberMe.checked? loginName.value: '');
                Cookies.setUntilBrowserClose('session', sessionKey);
                self.readCookies();
            } catch (error) {
                alert(error.message);
            } finally {
                window.clearTimeout(timer);
                self.showOverlay(false);
            }
        });

        logoutButton.addEventListener('click', (event) => {
            loginForm.reset();
            Cookies.setUntilBrowserClose('session', '');
            self.readCookies();
            event.preventDefault();
        });
    }


    showOverlay(display) {
        document.querySelector('.overlay').style.display = display? "block": "none";
    }
}

export default Ui;