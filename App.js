import { SafeAreaProvider } from 'react-native-safe-area-context';
import ShopStackNavigation from './src/navigation/shop/ShopStackNavigation';
import CartStackNavigation from './src/navigation/cart/CartStackNavigation';
import TabsNavigator from './src/navigation/tabs/TabsNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <ShopStackNavigation /> */}
        {/* <CartStackNavigation /> */}
        <TabsNavigator />
    </SafeAreaProvider>
  );
}
