import TabsNavigator from './src/navigation/tabs/TabsNavigator';
import Header from './src/components/Header';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { store } from './src/store/index';
import MainNavigator from './src/navigation/MainNavigator';
import React, { useEffect, useCallback, useState } from 'react';
import { loadFonts } from './fonts';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Simula carga de recursos (fonts, datos, etc.)
    const prepare = async () => {
      try {
        // Aquí puedes cargar fonts, datos, etc.
        await loadFonts();
        // Simula una carga de 2 segundos para ver el splash
        await new Promise(res => setTimeout(res, 2000));
        // await fetchInitialData();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <MainNavigator>
          
          <TabsNavigator />
        </MainNavigator>
      </SafeAreaView>
    </Provider>
  );
}
