import { AxiosResponse } from 'axios';
import { api } from './axios';
import { listDataVoluntarioInfo } from '@/models/voluntario';

/**
 * @param {string} accessToken
 * @returns {Promise<any>}
 */
export const listVolDataByName = async (name: string, accessToken: string): Promise<any> => {
    const response: AxiosResponse<any> = await api.get(`/user/${name}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
