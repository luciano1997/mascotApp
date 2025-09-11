import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ProductCard, ProductList, CategoryList } from '../../screens';
const Stack = createNativeStackNavigator();


const ShopStackNavigation = () => {
    return (
            <Stack.Navigator
            >
                <Stack.Screen options={{ headerShown: false }} name="CategoryList" component={CategoryList} />
                <Stack.Screen  name="ProductList" component={ProductList} />
                <Stack.Screen options={{ headerShown: false }} name="ProductCard" component={ProductCard} />
            </Stack.Navigator>
    );
};
export default ShopStackNavigation;