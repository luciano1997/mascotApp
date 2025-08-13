import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import products from "../../data/products.json"
import { useState } from 'react';
import ProductCard from './ProductCard';


const ProductList = (data) => {
  console.log("categoryId", data);

  return (
    <View>
      <FlatList
        data={products.filter(product => product.categoryId === data.route.params.categoryId)}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => setSelectedProduct(item.id)} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

export default ProductList

const styles = StyleSheet.create({
  renderItem: {
    borderRadius: 2,
    backgroundColor: "beige",
    marginVertical: 10,
    padding: 30,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray"
  },
  textName: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold"
  },
})