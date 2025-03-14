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

        if (response.ok) {
            return [response, null];
        }

        if(response.status === 422) {
            return ['', 'User couldn\'t be created successfully. Email has already been taken and Username has already been taken']
        }

        const errorMessage = await response.text();
        return ['', errorMessage];
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

        return [response, null];
    } catch (error) {
        return ['', `${error}`]
    }
}

export const logoutAPI = async (jwtToken) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
        }
    }

    try {
        const response = await fetch(`${apiUrl}/users/sign_out`, requestOptions);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        return [response, null];
    } catch (error) {
        return ['', `${error}`]
    }
}