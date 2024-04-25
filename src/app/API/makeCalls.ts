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
    console.log('response ', response);

    if (response.status === 200 && config.returnCleanResponse) {
      return response;
    } else if (response.status === 200) {
      return response.data;
    } else {
      throw new APIError(response.status, response.data?.message);
    }
  } catch (error: any) {
    console.log('erros', error);
    if (error?.response) {
      const { response } = error;
      if (
        config.isSecureRoute &&
        typeof refereshToken === 'string' &&
        response.status === 401 &&
        authToken &&
        !config.dontRefresh
      ) {
        try {
          // return handleTokenReferesh(config, refereshToken);
          // eslint-disable-next-line no-catch-shadow
        } catch (error) {
          if (error instanceof APIError) throw error;
        }
      } else if (error instanceof APIError) throw error;
      else throw new APIError(response?.status, response.data?.message);
    }

    if (error instanceof APIError) throw error;

    throw new APIError(500, 'Something went wrong');
  }
};

export default makeCall;
