import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useCachedResources from './../../../utils/hooks/useCachedResources';

import Navigation from '../../navigation';
import { ThemeProvider } from 'styled-components/native';

import { useSelector } from 'react-redux';

export default function DefaultLayout() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Navigation colorScheme={'light'} />
        <StatusBar />
      </>
    );
  }
}
