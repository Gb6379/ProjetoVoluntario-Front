import { AxiosResponse } from 'axios';
import { api } from './axios';
import { listDataInstitutionInfo } from '@/models/institution';

/**
 * @param {string} institutionId
 * @param {string} accessToken
 * @returns {Promise<any>}
 */
export const listInstData = async (id: string, accessToken: string): Promise<any> => {
    const response: AxiosResponse<any> = await api.get(`/institution/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
