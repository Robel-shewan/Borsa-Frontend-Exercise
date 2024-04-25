import { ApplicationsDefaultState } from 'app/layouts/ApplicationDefaults/slice/types';
import { IUserInitialState } from './../app/screens/User/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  user: IUserInitialState;
  applicationsDefault: ApplicationsDefaultState;
}
