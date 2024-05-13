
import { Institution } from '@/models/institution';
import {api} from './axios';


/**
*@param{any} data
*@returns
*/

export const createInstitution = (data: Institution, token: string = '') => {
    console.log("INST", data)
    return api.post('/auth/register/inst', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };