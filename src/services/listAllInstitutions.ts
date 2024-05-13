import { AxiosResponse } from 'axios';
import { api } from './axios';
import { listDataInstitutionInfo } from '@/models/institution';

/**

 * @param {string} accessToken
 * @returns {Promise<any>}
 */
export const listAllInstData = async (accessToken: string): Promise<any> => {
    const response: AxiosResponse<any> = await api.get(`/institution/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
