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
        const loginName = document.querySelector('#loginUsername');
        const loginPassword = document.querySelector('#loginPassword');
        
        loginName.value = Cookies.get('username');

        (loginName.value? loginPassword: loginName).focus();

        if (Cookies.get('cookieDisclaimer') === "seen") {
            document.querySelector('.cookie-disclaimer').classList.add('hidden');
        }
    }


    registerEvents() {
        const self = this;
        const root = document.querySelector('#root')
        const loginForm = document.querySelector('#login-panel form');
        const loginName = document.querySelector('#loginUsername');
        const loginPassword = document.querySelector('#loginPassword');
        const loginButton = document.querySelector('.login');
        const logoutButton = document.querySelector('.logout');
        const rememberMe = document.querySelector('#remember-me');
        
        loginButton.addEventListener('click', async (event) => {
            self.showOverlay(true);
            event.preventDefault();

            try {
                const response = await this.api.login(loginName.value, loginPassword.value);

                console.log(response);
                Cookies.set('username', rememberMe.checked? loginName.value: '');
                root.classList.add('logged-in');
            } catch (error) {
                alert(error.message);
            } finally {
                self.showOverlay(false);
            }
        });

        logoutButton.addEventListener('click', (event) => {
            loginForm.reset();
            self.readCookies();
            root.classList.remove('logged-in');
            event.preventDefault();
        });
    }


    showOverlay(display) {
        document.querySelector('.overlay').style.display = display? "block": "none";
    }
}

export default Ui;