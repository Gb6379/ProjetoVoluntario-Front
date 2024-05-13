import { AxiosResponse } from 'axios';
import { api } from './axios';

/**
 * @param {string} token
 * @returns {Promise<any>}
 */

export const listAllCities = async (token: string): Promise<any> => {
  const response: AxiosResponse<any> = await api.get('/region/allCities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; 
};
