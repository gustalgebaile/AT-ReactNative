import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CartScreen({ route, navigation }) {
  const { theme } = useTheme();

  const { cart } = route.params;

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, { backgroundColor: theme.cardBackgroundColor }]}>
      <Text style={[styles.cartText, { color: theme.color }]}>
        {item.name} - R${item.price.toFixed(2)} x {item.quantity}
      </Text>
    </View>
  );

  const handleCheckout = () => {
    navigation.navigate('Checkout', {
      cartItems: cart,
      totalPrice: calculateTotal(),
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.color }]}>Carrinho de Compras</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.list}
      />
      <Text style={[styles.total, { color: theme.color }]}>
        Total: R${calculateTotal().toFixed(2)}
      </Text>

      <TouchableOpacity
        style={[styles.checkoutButton, { backgroundColor: theme.buttonBackgroundColor }]}
        onPress={handleCheckout}
      >
        <Text style={[styles.checkoutButtonText, { color: theme.buttonTextColor }]}>
          Ir para Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cartItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  checkoutButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    fontSize: 18,
  },
});
