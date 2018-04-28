'use strict';

import Account from './account';


class Ui {
    constructor(api) {
        this.account = new Account(api);
        this.ui = {
            cookieDisclaimer: document.querySelector('.cookie-disclaimer'),
            errorMessage: document.querySelector('#errors'),
            loginButton: document.querySelector('.login'),
            loginForm: document.querySelector('#login-panel form'),
            loginName: document.querySelector('#loginUsername'),
            loginPassword: document.querySelector('#loginPassword'),
            logoutButton: document.querySelector('.logout'),
            rememberMe: document.querySelector('#remember-me'),
            root: document.querySelector('#root')
        };
    }


    initialise() {       
        const account = this.account;
        const self = this;
        const ui = this.ui;

        this.setState();
        
        ui.loginButton.addEventListener('click', async (event) => {
            const timer = window.setTimeout(() => { self.showOverlay(true); }, 100)
            
            event.preventDefault();

            try {
                await account.login(
                    ui.loginName.value,
                    ui.loginPassword.value,
                    ui.rememberMe.checked);

                self.setState();
            } catch (error) {
                ui.errorMessage.textContent = error.message;
            } finally {
                ui.loginPassword.value = '';
                window.clearTimeout(timer);
                self.showOverlay(false);
            }
        });


        ui.logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            account.logout();
            self.setState();
        });
    }


    setState() {
        const ui = this.ui;
        const username = this.account.username;

        ui.loginForm.reset();
        ui.errorMessage.textContent = '';
        ui.loginName.value = username;
        (username? ui.loginPassword: ui.loginName).focus();

        if (this.account.sessionKey) {
            ui.root.classList.add('logged-in');
        } else {
            ui.root.classList.remove('logged-in');
        }

        if (this.account.isDisclaimerSeen) {
            ui.root.classList.add('disclaimer-seen');
        } else {
            ui.root.classList.remove('disclaimer-seen');
        }
    }


    showOverlay(display) {
        document.querySelector('.overlay').style.display = display? "block": "none";
    }
}

export default Ui;