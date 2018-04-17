import Promise from 'promise-polyfill';
import _ from 'lodash';

const PRIVATE_KEY = process.env.NODE_PRIVATE_KEY;

const baseUri = '/v3';
const serverApi = {
    GET_SEARCH_RESULT: {
        method: 'GET',
        url: `${baseUri}/businesses/search?{location}&{open_at}&{limit}&{sort_by}`
    }
};

export const sendRequest = (apiKey, options) => {
    return new Promise((resolve, reject) => {
        const {
            urlParams,
            ...otherOptions
        } = options || {};

        let queryOptions = {
            credentials: 'same-origin',
            contentType: 'application/json',
            headers: {
                'authorization': `Bearer ${PRIVATE_KEY}`,
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Expires': -1
            }
        };

        if (_.isString(apiKey) && serverApi[apiKey]) {
            const method = serverApi[apiKey].method;
            let url = serverApi[apiKey].url;

            if (_.isObject(urlParams)) {
                Object.keys(urlParams).forEach((key) => {
                    url = url.replace(`{${key}}`, `${key}=${urlParams[key]}`);
                });
            }

            queryOptions = {
                ...queryOptions,
                method,
                url,
                ...otherOptions
            };
        } else if (_.isObject(apiKey)) {
            queryOptions = apiKey;
        }

        fetch(queryOptions.url, queryOptions).then((response) => {
            if (response.status === 200) {
                response.json().then((rsp) => {
                    resolve(rsp);
                });
            } else {
                response.json().then((rsp) => {
                    reject(rsp.error);
                });
            }
        }, (error) => {
            reject(error);
        });
    });
};

export default sendRequest;
