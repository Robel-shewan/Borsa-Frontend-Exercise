import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useCachedResources from './../../../utils/hooks/useCachedResources';

import Navigation from '../../navigation';
import { ThemeProvider } from 'styled-components/native';

import { useSelector } from 'react-redux';
import { ApplicationDefaults } from '../../layouts/';

export default function DefaultLayout() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <ApplicationDefaults />
        <Navigation colorScheme={'light'} />
        <StatusBar />
      </>
    );
  }
}
