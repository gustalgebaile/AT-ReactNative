import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const mockOrders = [
  {
    id: '1',
    items: [
      { name: 'Hambúrguer', quantity: 1, price: 16.0 },
      { name: 'Refrigerante', quantity: 1, price: 9.0 },
    ],
    status: 'Em preparo',
    total: 25.0,
  },
  {
    id: '2',
    items: [
      { name: 'Coxinha', quantity: 3, price: 5.0 },
      { name: 'Suco Natural', quantity: 2, price: 7.0 },
    ],
    status: 'Entregue',
    total: 29.0,
  },
  {
    id: '3',
    items: [
      { name: 'Sanduíche Natural', quantity: 1, price: 9.0 },
      { name: 'Cerveja', quantity: 1, price: 6.0 },
    ],
    status: 'Cancelado',
    total: 15.0,
  },
];

export default function OrdersScreen({ navigation }) {
  const { theme } = useTheme();
  const [orders, setOrders] = useState(mockOrders);

  const renderOrderItem = ({ item }) => (
    <View style={[styles.orderItem, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.orderTitle, { color: theme.color }]}>Pedido #{item.id}</Text>
      <Text style={{color: theme.color}}>Status: {item.status}</Text>
      <FlatList
        data={item.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: theme.color }}>
            {item.name} x {item.quantity} - R${(item.price * item.quantity).toFixed(2)}
          </Text>
        )}
        style={styles.itemsList}
      />
      <Text style={[styles.total, { color: theme.color }]}>
        Total: R${item.total.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.color }]}>Meus Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.buttonColor }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
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
  orderItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemsList: {
    marginVertical: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
