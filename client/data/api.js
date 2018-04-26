'use strict';

import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const apiVersion = 1;


function handleErrors(path, response, ignoreCodes, statusField) {
    if (!response || !response.status) {
        throw Error(`Reponse from ${path} was null.`)
    } else if (response.ok || (ignoreCodes && ignoreCodes.indexOf(response.status) >= 0)) {
        let body = (response.body? response.json(): null) || {};

        if (statusField) {
            body = {
                body: body,
                status: response.status
            };
        }
        return body;
    } else {
        const error = new Error(response.statusText || "Unknown Error");

        error.httpStatusCode = response.status;

        throw error;
    }
}


async function get(path, body, { ignoreCodes = [], statusField = null } = {}) {
    const response = await fetch(`/api/v${apiVersion}/${path}`);

    return handleErrors(path, response, ignoreCodes, statusField);
}


async function post(path, body, { ignoreCodes = [], statusField = null } = {}) {
    const response = await fetch(`/api/v${apiVersion}/${path}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body || {})
    });

    return handleErrors(path, response, ignoreCodes, statusField);
}



class Api {
    async login(username, password) {
        return post("login", { username, password });
    }
}

export default Api;