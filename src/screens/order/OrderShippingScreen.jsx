import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../global/colors';
const OrderShippingScreen = () => {
  

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.lightGray }}>
      <Text style={styles.confirmationMessage}>Tu compra fue procesada con exito</Text>
      <Text style={styles.orderDetails}>Los detalles de la orden fueron enviados a tu correo</Text>
    </View>
  )
}

export default OrderShippingScreen

const styles = StyleSheet.create({
  confirmationMessage:
  {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center",

  },
})