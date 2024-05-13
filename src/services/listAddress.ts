import { AxiosResponse } from 'axios';
import { api } from './axios';
import { listDataAddressioInfo } from '@/models/address';

/**
 * @param {string} institutionId
 * @param {string} accessToken
 * @returns {Promise<any>}
 */
export const listAddressData = async (id: string, accessToken: string): Promise<any> => {
    const response: AxiosResponse<any> = await api.get(`/enderecos/institution/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
