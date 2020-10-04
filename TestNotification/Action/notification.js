import { SERVER_CONFIG } from '../Utility/ServerConfig';

export async function getNotificationList(page) {
    return fetch(`${SERVER_CONFIG.BASE_URL}/news?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log("Request ERROR :", error);
        });
}

// https://api.stackexchange.com/2.2/users?page=${page}&order=desc&sort=reputation&site=stackoverflow
