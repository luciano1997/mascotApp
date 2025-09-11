import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { use, useEffect, useState } from 'react';
import ProductCard from './ProductCardScreen';
import { useRoute } from '@react-navigation/native';
import { useGetProductsByCategoryQuery } from '../../services/shopApi';

const ProductList = () => {
  const route = useRoute();
  const { categoryId } = route.params;
  console.log("categoryId", categoryId);
  const {data:products, isLoading, error} = useGetProductsByCategoryQuery(categoryId)

  useEffect(() => {
    products && console.log("Products by category:", products);
    if (error) {
      console.log("Error fetching products:", error);
    }
  }, [error]);

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
        //onPress={() => setSelectedProduct(item.id)}
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