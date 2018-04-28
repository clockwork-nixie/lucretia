'use strict';

export default {
    get: name => {
        const search = name + "=";
        const cookies = decodeURIComponent(document.cookie).split(';');

        for(var i = 0; i < cookies.length; ++i) {
            const cookie = cookies[i];

            if (cookie) {
                const length = cookie.length;

                for (let start = 0; start < length; ++start) {
                    if (cookie.charAt(start) !== ' ') {
                        if (cookie.indexOf(search, start) === start) {
                            return cookie.substring(start + search.length, length);
                        }
                        break;
                    }
                }
            }
        }
        return "";
    },


    setForever: (name, value) => {
        // There is no "forever" for cookies, so set expiry way in the future.
        const expires = "expires="+ new Date(2037,1,1).toUTCString();
            
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
    },


    setUntilBrowserClose: (name, value) => {
        document.cookie = `${name}=${encodeURIComponent(value)};path=/`;
    }
};
