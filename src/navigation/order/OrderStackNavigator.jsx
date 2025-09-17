import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderShippingScreen from "../../screens/order/OrderShippingScreen";
import OrdersScreen from "../../screens/order/OrdersScreen";
import OrderSummaryScreen from "../../screens/order/OrderSummaryScreen";

const Stack = createNativeStackNavigator();

const OrderStackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="OrderScreen"
                component={OrdersScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="OrderSummary"
                component={OrderSummaryScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="OrderShipping"
                component={OrderShippingScreen}
            />
        </Stack.Navigator>
    );
};

export default OrderStackNavigation;