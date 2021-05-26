import i18n from 'i18next';
import { restObj, normalizeUrl } from 'utils/helpers';
import ResponseError from 'utils/ResponseError';

export const BACKEND_URL = 'http://localhost:8000/api/v1';

export const getToken = () => {
    const storage = window.localStorage;
    return {'Authorization': `Bearer ${storage.getItem('token')}`};
}

class Api {
    get =  (path) => {
        return this.request('get', path, false, true);
    }

    post =  (path, body = {}, isToken = true) => {
        return this.request('post', path, body, isToken);
    }

    put = (path, body = {}, isToken = true) => {
        return this.request('put', path, body, isToken);
    }

    request = async (method, path, body, isToken) => {
        const config = this.getConfig(method, isToken);
        const url = `${BACKEND_URL}/${normalizeUrl(path)}`;
        const bodyContent = { body:  JSON.stringify(body)};

        const response = await fetch(url, {...config, ...restObj(body, bodyContent)});
        const data = await response.json();

       if (!response.ok) {

           throw new ResponseError(response, response.status, data?.message, data?.errors);
       }

        return data;
    }

    getConfig = (method, isToken) => {
        const storage = window.localStorage;
        const token = {'Authorization': `Bearer ${storage.getItem('token')}`};
        const lang = i18n.language;

        return {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Language': lang,
                ...restObj(isToken, token),
            }
        };
    }
}

export default new Api();