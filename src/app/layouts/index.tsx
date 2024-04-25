/**
 *
 * ApplicationDefaults
 *
 */
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Card,
  Icon,
  Modal,
  Text,
  useTheme,
} from '@ui-kitten/components';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useApplicationsDefaultSlice } from './ApplicationDefaults/slice';
import { selectAppMessage } from '././ApplicationDefaults/slice/selectors';
import { IAppMessageSeverities } from './ApplicationDefaults/slice/types';

interface IconConfig {
  name: string;
  color: string;
}

interface Props {}

const getIconConfigByAppMessageSeverity = (
  severity: IAppMessageSeverities,
): IconConfig => {
  switch (severity) {
    case 'error':
      return { name: 'alert-circle-outline', color: 'color-danger-default' };
    case 'success':
      return {
        name: 'checkmark-circle-outline',
        color: 'color-success-default',
      };
    case 'warning':
      return { name: 'alert-triangle-outline', color: 'color-warning-default' };
    default:
      return { name: 'info-outline', color: 'color-primary-default' };
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ApplicationDefaults(props: Props) {
  const theme = useTheme();
  const { actions } = useApplicationsDefaultSlice();
  const dispatch = useDispatch();
  const appMessageState = useSelector(selectAppMessage);
  const appMessageSeverity = appMessageState?.severity || 'info';
  const iconConfig = getIconConfigByAppMessageSeverity(appMessageSeverity);
  const isAppMessageOpen = Boolean(
    appMessageState?.message && appMessageState?.dialogType !== 'snack-bar',
  );
  const isSnackBarOpen = Boolean(
    appMessageState?.message && appMessageState?.dialogType === 'snack-bar',
  );

  const onCloseAppMessage = () => {
    dispatch(actions.hideAppMessage());
  };

  return (
    <React.Fragment>
      <Modal
        visible={isAppMessageOpen}
        backdropStyle={styles.backdrop}
        onBackdropPress={onCloseAppMessage}
      >
        <Card disabled={true} style={styles.container}>
          <View style={styles.iconContainer}>
            <Icon
              fill={theme[iconConfig.color]}
              style={styles.alertIcon}
              name={iconConfig.name}
            />
          </View>

          <Text category="s1">{appMessageState?.message}</Text>
          <Button
            size="small"
            style={styles.dismissButton}
            onPress={onCloseAppMessage}
          >
            {appMessageState?.dismissText || 'DISMISS'}
          </Button>
        </Card>
      </Modal>

      <Snackbar
        style={styles.snackbar}
        visible={isSnackBarOpen}
        onDismiss={onCloseAppMessage}
        action={{
          label: 'Dismiss',

          onPress: onCloseAppMessage,
        }}
      >
        {appMessageState?.message}
      </Snackbar>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get('screen').width - 40,
    minHeight: 130,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertIcon: {
    width: 50,
    height: 50,
  },

  dismissButton: {
    marginTop: 10,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbar: {
    zIndex: 10,
  },
});
