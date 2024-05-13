import { AxiosResponse } from 'axios';
import { api } from './axios';
import { listDataVoluntarioInfo } from '@/models/voluntario';

/**
 * @param {string} userId
 * @param {string} accessToken
 * @returns {Promise<any>}
 */
export const listAllVolData = async (accessToken: string): Promise<any> => {
    const response: AxiosResponse<any> = await api.get(`/user`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
