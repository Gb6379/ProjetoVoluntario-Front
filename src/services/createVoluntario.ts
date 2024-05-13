import { Volutario } from '../models/voluntario';
import {api} from './axios';


/**
*@param{any} data
*@returns
*/

export const createVoluntario = (data: Volutario, token: string = '') => {
    return api.post('/auth/register', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };