import {apiUrl} from './config.js';

export const registerAPI = async (bodyObject) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    }

    try {
        const response = await fetch(`${apiUrl}/users`, requestOptions);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Request failed: ${response.status} ${errorData}`);
        }

        const result = await response.json();
        return [result, null];
    } catch (error) {
        return ['', `Server down: ${error}`]
    }
}

export const loginAPI = async (bodyObject) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    }

    try {
        const response = await fetch(`${apiUrl}/users/sign_in`, requestOptions);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        const result = await response.json();
        return [result, null];
    } catch (error) {
        return ['', `${error}`]
    }
}