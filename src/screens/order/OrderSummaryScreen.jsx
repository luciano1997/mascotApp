import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../global/colors';
import { usePostOrderMutation } from '../../services/ordersApi';
import dayjs from 'dayjs';
import { clearCart } from '../../store/slices/cartSlice';
import { useUpdateProductStockMutation } from '../../services/shopApi';
const OrderSummaryScreen = () => {
    const cart = useSelector(state => state.cartReducer);
    const user = useSelector(state => state.authReducer);
    // console.log(user);
    const dispatch = useDispatch();
    const navigator = useNavigation();
    const [errorMsg, setErrorMsg] = useState("");
    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    const [locationLoaded, setLocationLoaded] = useState(false)
    const [triggerPostOrder, result] = usePostOrderMutation();
    const [updateStock] = useUpdateProductStockMutation();
     
    const handlePay = async () => {
        try {
            // guardar la orden en la firebase
            console.log("Orden guardada en Firebase", cart);
            await triggerPostOrder({ ...cart, date: new Date().toISOString(), userId: user.localId, ordenId: Math.random().toString(36).substring(7) });
            // actualizar stock en firebase
            cart.cartItems.forEach(item => {
                console.log("Actualizando stock para el producto:", item.id, "Nuevo stock:", item.stock - item.quantity);
                
                updateStock({ productId: item.id, newStock: item.stock - item.quantity });
            });

            dispatch(clearCart());
            navigator.navigate("Ordenes", { screen: "OrderScreen" });
            // para no volver al Summary que esta en el stack montado, uso popToTop
            navigator.popToTop();

        } catch (error) {
            console.error("Error al guardar la orden:", error);
        }
    }
    useEffect(() => {
        console.log("location effect");
        if(cart.cartItems.length === 0){
            console.log("Carrito vacio, redirigiendo");
            
            navigator.popToTop();
            return;
        }
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Los permisos fueron denegados');
                    return;
                }

                let location = await Location.getCurrentPositionAsync();
                if (location) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`
                    );
                    const data = await response.json()
                    // console.log("Data desde geocoding", data)
                    setLocation(location)
                    setAddress(data.results[0].formatted_address)
                }
            } catch (error) {
                console.log("Error al obtener la ubicación:", error);
            } finally {
                setLocationLoaded(true);
            }
        }

        getCurrentLocation();
    }, []);

    return (

        <FlatList

            data={cart.cartItems}
            keyExtractor={item => item.id}

            renderItem={({ item }) => (
                <View key={item.id} style={styles.orderItem}>
                    <View>
                        <Image
                            source={{ uri: item.images[0] }}
                            style={styles.cartImage}
                            resizeMode='cover'
                        />
                    </View>
                    <View>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
                        <Text style={styles.productPrice}>Precio unitario: ${item.price}</Text>
                        <Text style={styles.productTotal}>Total: ${item.quantity * item.price}</Text>
                    </View>
                </View>
            )}
            ListHeaderComponent={() => (
                <View backgroundColor="white" style={styles.orderSummaryContainer}>
                    <Text style={styles.confirmationMessage}>Estas a un paso de completar tu compra!</Text>
                </View>
            )}
            ListFooterComponent={() => (
                <>
                    <View style={styles.viewInfo}>
                        <Text>Direccion de envio:</Text>
                        <View style={styles.placeDescriptionContainer}>
                            <View style={styles.paymentMethodContainer}>
                                <Text style={styles.paymentMethodText}>{address ? address : ""}</Text>
                            </View>
                        </View>
                        <Text>Metodo de pago:</Text>
                        <View style={styles.paymentMethodContainer}>
                            <Text style={styles.paymentMethodText}>Tarjeta de credito</Text>
                        </View>
                        <Text>Fecha de entrega estimada:</Text>
                        <View style={styles.deliveryDateContainer}>
                            <Text style={styles.paymentMethodText}>{dayjs().locale('es').add(1, 'day').format('DD-MM-YYYY')}</Text>
                        </View>
                        <View>
                            <Text style={styles.totalText}>Total a pagar: ${cart.total}</Text>
                        </View>
                    </View>
                    <Pressable style={styles.confirmButton} onPress={handlePay}>
                        <Text style={styles.confirmButtonText}>Pagar</Text>
                    </Pressable>
                </>
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
        />
    )
}

export default OrderSummaryScreen;

const styles = StyleSheet.create({
    orderItem: {
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        // flexGrow: 1,
        padding: 20,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 16,
    },
    deliveryDateText: {
        fontSize: 14,
        fontWeight: '400',
    },
    cartImage: {
        width: 80,
        height: 80
    },
    confirmButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
    },
    confirmButtonText: {
        color: colors.textLight,
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderSummaryContainer: {
        padding: 20,
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    confirmationMessage:
    {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center"
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    placeDescriptionContainer: {
        flexDirection: 'row',
        gap: 16
    },
    addressContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    address: {
        fontSize: 14,
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        margin: 16
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    paymentMethodContainer: {
        paddingVertical: 16,
        marginHorizontal: 16
    },
    paymentMethodText: {
        fontSize: 14,
        fontWeight: '500',
    },
    deliveryDateContainer: {
        paddingVertical: 16,
        marginHorizontal: 16
    },
    viewInfo: {
        backgroundColor: 'white',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
    },
    productQuantity: {
        fontSize: 14,
        // color: '#555',
    },
    productPrice: {
        fontSize: 14,
        // color: '#555',
    },
    productTotal: {
        fontSize: 14,
        fontWeight: '600',
    },
})