import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useGetOrdersByUserQuery } from '../../services/ordersApi';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const OrdersScreen = () => {
  const user = useSelector(state => state.authReducer);
  const { data: orders = [], isLoading, error } = useGetOrdersByUserQuery(user.localId, { refetchOnFocus: true, refetchOnReconnect: true });

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer} key={item.ordenId}>
      <Text>Fecha: {dayjs(item.date).format('DD/MM/YYYY')}</Text>
      <Text>Total: ${item.total}</Text>
      <Text>Items:</Text>
      {item.cartItems.map(product => (
        <View key={product.id} style={{ marginLeft: 16 }}>
          <Text>- {product.name} x {product.quantity} = ${product.price * product.quantity}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading && <Text>Cargando...</Text>}
      {error && <Text>Error al cargar las órdenes</Text>}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.ordenId}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay órdenes aún</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, },
  orderContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,

  },

})