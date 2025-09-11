import TabsNavigator from './src/navigation/tabs/TabsNavigator';
import { NavigationContainer } from "@react-navigation/native";
import Header from './src/components/Header';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {store} from './src/store/index'
import MainNavigator from './src/navigation/MainNavigator';
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <MainNavigator>
          {/* <ShopStackNavigation /> */}
          {/* <CartStackNavigation /> */}
          <Header />
          <TabsNavigator />
        </MainNavigator>
      </SafeAreaView>
    </Provider>
  );
}
