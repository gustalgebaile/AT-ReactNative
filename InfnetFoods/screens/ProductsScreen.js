import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTheme } from '../context/ThemeContext'; 

const mockProducts = {
  Lanches: [
    { id: '1', name: 'Hambúrguer', price: 16.0 },
    { id: '2', name: 'Sanduíche Natural', price: 9.0 },
    { id: '3', name: 'Coxinha', price: 5.0 },
  ],
  Chinesa: [
    { id: '4', name: 'Guioza', price: 12.0 },
    { id: '5', name: 'Yakisoba', price: 26.0 },
    { id: '6', name: 'Arroz Chop-Suey', price: 30.0 },
  ],
  Sobremesas: [
    { id: '7', name: 'Pudim', price: 14.0 },
    { id: '8', name: 'Torta de Limão', price: 18.0 },
    { id: '9', name: 'Sorvete', price: 3.0 },
  ],
  Japonesa: [
    { id: '10', name: 'Sashimi', price: 2.0 },
    { id: '11', name: 'Sushi', price: 3.0 },
    { id: '12', name: 'Koni', price: 21.0 },
  ],
  Saladas: [
    { id: '13', name: 'Salada Simples', price: 8.0 },
    { id: '14', name: 'Salada Ceaser', price: 10.0 },
    { id: '15', name: 'Salada com Frango', price: 16.0 },
  ],
  Bebidas: [
    { id: '16', name: 'Refrigerante 2L', price: 9.0 },
    { id: '17', name: 'Suco Natural', price: 7.0 },
    { id: '18', name: 'Cerveja', price: 6.0 },
  ],
  Pizza: [
    { id: '19', name: 'Marghuerita', price: 56.0 },
    { id: '20', name: 'Jussara', price: 65.0 },
    { id: '21', name: 'Calabresa', price: 48.0 },
  ],
};

export default function ProductsScreen({ route, navigation }) {
  const { category } = route.params;
  const products = mockProducts[category.name] || [];
  const [cart, setCart] = useState([]);
  const scaleAnim = useRef(new Animated.Value(0)).current; // Valor inicial da escala
  const opacityAnim = useRef(new Animated.Value(0)).current; // Valor inicial da opacidade
  const { theme } = useTheme();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.5, // Escala aumentada
        duration: 400, // Duração da animação
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1, // Opacidade máxima
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reseta a animação após um tempo
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0, // Escala inicial
          duration: 400,
          delay: 700, // Tempo de espera antes de desaparecer
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0, // Opacidade inicial
          duration: 400,
          delay: 700,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const renderProduct = ({ item, addToCart }) => (
  <View style={styles.productItem}>
    <Text style={styles.productText}>
      {item.name} - R${item.price.toFixed(2)}
    </Text>
    <Button title="Adicionar ao Carrinho" onPress={() => addToCart(item)} />
  </View>
);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.color }]}>Produtos: {category.name}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(props) => renderProduct({ ...props, addToCart })}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={[styles.cartButton, { backgroundColor: 'steelblue' }]}
        onPress={() => navigation.navigate('Cart', { cart })}>
        <Text style={[styles.cartButtonText, { color: theme.buttonTextColor }]}>🛒 Ir para o Carrinho</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.checkIcon,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        ]}>
        <Text style={styles.checkText}>✔</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  productItem: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  productText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  cartButton: {
    backgroundColor: 'steelblue',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 8,
    backgroundGradient: 'linear-gradient(90deg, #00796b, #004d40)',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkIcon: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#4caf50',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  checkText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
