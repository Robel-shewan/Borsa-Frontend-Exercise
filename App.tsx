import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import Store from './src/store/configureStore';
import DefaultLayout from './src/app/screens/defaultLayout';
import useCachedResources from './src/utils/hooks/useCachedResources';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import 'regenerator-runtime/runtime';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={Store}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <DefaultLayout />
          </ApplicationProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
