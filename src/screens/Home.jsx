import { StyleSheet, Text, View } from 'react-native'
import CategoryList from '../components/CategoryList'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'
import { useState } from 'react'
import BottomNavigationComponent from '../components/common/BottomNavigationComponent'
const Home = () => {
    const [pantallaActiva, setPantallaActiva] = useState('categorias');
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(0);

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        setPantallaActiva('productos');
    }

    const handleSelectProduct = (productId) => {
        setSelectedProduct(productId);
    }

    const renderContent = () => {
        switch (pantallaActiva) {
            case 'categorias':
                return <CategoryList onSelectCategory={handleSelectCategory} />;
            case 'productos':
                const filteredProducts = products.filter(p => p.categoryId === selectedCategory);
                return <ProductList  products={filteredProducts} setSelectedProduct={handleSelectProduct} />;
            default:
                return null;
        }
    }

    return (
        <View style={styles.viewPrincipal}>
            {renderContent()}
            <BottomNavigationComponent />
        </View>
        
    )
}

export default Home

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
})