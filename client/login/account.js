'use strict';

import Cookies from './cookies';


class Account {
    constructor(api) {
        this.api = api;
        this.isDisclaimerSeen = Cookies.get('isDisclaimerSeen');
        this.sessionKey = Cookies.get('session');
        this.username = Cookies.get('username');
    }


    async login(username, password, isRememberMe) {
        try {
            this.sessionKey = await this.api.login(username, password);
            this.username = isRememberMe? username: '';

            Cookies.setForever('username', this.username);
            Cookies.setUntilBrowserClose('session', this.sessionKey);
        } catch (error) {
            let message;

            if (error.httpStatusCode) {
                switch (error.httpStatusCode) {
                    case 400:   // Bad request
                    case 401:   // Unauthorised
                        message = 'Username or password incorrect.';
                        break;

                    case 500:
                        message = 'Something went wrong on the server.';
                        break;

                    default:
                        message = 'Something went wrong outside of our control.';
                        break;
                }
            }
            throw Error(message);
        }
    }


    logout() {
        this.sessionKey = null;
        Cookies.setUntilBrowserClose('session', '');
    }
}

export default Account;