import { AxiosError } from 'axios';
import { APIError } from './Errors';

export const handleAPICallsError = (error: AxiosError) => {
  if (error?.response || error instanceof APIError) {
    /** Handle other error codes error */
    if (error instanceof APIError) throw error;
  } else if (error?.request) {
    throw new APIError(500, 'A Network Error Occured');
  } else {
    throw new APIError(500, 'Something went wrong');
  }
};
