import { AxiosResponse } from 'axios';
import { api } from './axios';
import { listDataInstitutionInfo } from '@/models/institution';

/**

 * @param {string} accessToken
 * @returns {Promise<any>}
 */
export const listAllpickupSpot = async (accessToken: string): Promise<any> => {
    const response: AxiosResponse<any> = await api.get(`/institution/pickupSpot`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
