export type IAppMessageSeverities = 'success' | 'warning' | 'info' | 'error';

export interface IAppMessageConfig {
  dialogType?: 'snack-bar' | 'modal';
  severity?: IAppMessageSeverities;
  message: string;
  dismissText?: string;
  goBackOnDismiss?: boolean;
}

export interface ApplicationsDefaultState {
  appMessage?: IAppMessageConfig;
}
