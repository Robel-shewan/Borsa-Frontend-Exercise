import axios, { AxiosRequestHeaders } from 'axios';
import { API_ROUTE } from '../../utils/constants';
import { APIError } from './Errors';
import { HeaderObj, IAPICallConfig } from './types';
import { IUserModel } from 'app/models/user';

const makeCall = async (config: IAPICallConfig) => {
  let authToken;
  let refereshToken;
  try {
    const fullURL = `${config.route}`;
    const header: HeaderObj = config.header ? { ...config.header } : {};
    if (config.isSecureRoute) {
      // const user: IUserModel
      // handle token
      // authToken = user?.token || '';
      // header.Authorization = `Bearer ${authToken}`;
    }
    if (config.reCaptchaToken) {
      header['RECAPTCHA-RESPONSE'] = config.reCaptchaToken;
    }

    const response = await axios({
      method: config.method,
      params: config.query,
      data: config.body,
      url: fullURL,
      headers: header as AxiosRequestHeaders,
      responseType: config.responseType || 'json',
    });

    if (response.status === 200 || 201) {
      return response.data;
    } else {
      throw new APIError(response.status, response.data?.message);
    }
  } catch (error: any) {
    if (error?.response) {
      const { response } = error;

      if (
        config.isSecureRoute &&
        typeof refereshToken === 'string' &&
        response.status === 401 &&
        authToken &&
        !config.dontRefresh
      ) {
      } else if (error instanceof APIError) throw error;
      else throw new APIError(response?.status, response.data?.message);
    }

    if (error instanceof APIError) throw error;

    throw new APIError(500, 'Something went wrong');
  }
};

export default makeCall;
