import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Search from '../../components/SearchComponent'

const CartScreen = () => {
  return (
    <View>
      <Search placeholder="Buscar producto..." />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({})