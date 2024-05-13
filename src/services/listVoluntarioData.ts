import { AxiosResponse } from 'axios';
import { api } from './axios';

/**
 * @param {string} userId
 * @param {string} accessToken
 * @returns {Promise<any>}
 */
export const listVoluntarioData = async (id: string, accessToken: string): Promise<any> => {
    const response: AxiosResponse<any> = await api.get(`/user`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
