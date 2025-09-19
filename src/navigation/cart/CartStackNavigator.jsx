import { createNativeStackNavigator } from '@react-navigation/native-stack';    
import CartScreens from '../../screens/cart/CartScreen';
import OrderSummaryScreen from '../../screens/order/OrderSummaryScreen';
import OrderShippingScreen from '../../screens/order/OrderShippingScreen';
    
const Stack = createNativeStackNavigator();

const CartStackNavigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="cart"  options={{ headerShown: false }} component={CartScreens} />
        <Stack.Screen name="OrderSummary" options={{ headerShown: false }} component={OrderSummaryScreen} /> 
        <Stack.Screen name="OrderShipping" options={{ headerShown: false }} component={OrderShippingScreen} /> 
        
      </Stack.Navigator>
  )
}

export default CartStackNavigation
