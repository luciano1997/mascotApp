import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { use, useEffect, useState } from 'react';
import ProductCard from './ProductCardScreen';
import { useGetProductsByCategoryQuery } from '../../services/shopApi';
import { useSelector } from 'react-redux';

const ProductList = () => {

  // traer desde el reducer el categorySelected
   const categorySelected = useSelector(state => state.shopReducer.categorySelected);


  const {data:products, isLoading, error} = useGetProductsByCategoryQuery(categorySelected);

  useEffect(() => {
    // products && console.log("Products by category:", products);
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