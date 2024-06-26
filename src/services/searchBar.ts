import { AxiosResponse } from 'axios';
import { api } from './axios';
import { listDataVoluntarioInfo } from '@/models/voluntario';

/**
 * @param {string} accessToken
 * @returns {Promise<any>}
 */
export const listInstDataByName = async (name: string, accessToken: string): Promise<any> => {
    const queryParams: { [key: string ]: string } = {}
    queryParams.name = name;
    const response: AxiosResponse<any> = await api.get(`/institution/filter`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: queryParams
    });
    return response.data;
};
