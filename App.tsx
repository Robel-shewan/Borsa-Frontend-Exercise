import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';

import { Provider } from 'react-redux';
import { configureAppStore } from './src/store/configureStore';
import DefaultLayout from './src/app/screens/defaultLayout';
import useCachedResources from './src/utils/hooks/useCachedResources';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const store = configureAppStore();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <DefaultLayout />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
