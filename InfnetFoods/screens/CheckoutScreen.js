import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function CheckoutScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { cartItems, totalPrice } = route.params;
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});

useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Status do Pedido 📦',
        body: 'Seu pedido está sendo preparado e será entregue em breve!',
        data: { orderId: 123 },
      },
      trigger: { seconds: 2 },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!address) {
      newErrors.address = 'Endereço é obrigatório.';
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Método de pagamento é obrigatório.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      alert('Pedido realizado com sucesso!');
      navigation.navigate('Home');
      sendNotification();
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.color }]}>Revisar Pedido</Text>

      <View style={styles.cartSection}>
        <Text style={[styles.cartTitle, { color: theme.color }]}>Itens no carrinho</Text>
        {cartItems.map((item, index) => (
          <View key={index} style={[styles.cartItem, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.cartItemText, { color: theme.color }]}>
              {item.name} - Quantidade: {item.quantity} - Preço: R${(item.price.toFixed(2)) * (item.quantity)}
            </Text>
          </View>
        ))}
        <Text style={[styles.cartTotal, { color: theme.color }]}>
          Preço Total: R${totalPrice.toFixed(2)}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.color }]}>Endereço de Entrega</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.cardBorderColor, backgroundColor: theme.backgroundColor, color: theme.color }]}
          placeholder="Digite seu endereço"
          value={address}
          onChangeText={setAddress}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.color }]}>Método de Pagamento</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.cardBorderColor, backgroundColor: theme.backgroundColor, color : theme.color }]}
          placeholder="Digite o método de pagamento"
          value={paymentMethod}
          onChangeText={setPaymentMethod}
        />
        {errors.paymentMethod && <Text style={styles.errorText}>{errors.paymentMethod}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.checkoutButton, { backgroundColor: theme.buttonBackgroundColor }]}
        onPress={handleCheckout}
      >
        <Text style={[styles.checkoutButtonText, { color: theme.buttonTextColor }]}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  cartSection: {
    marginBottom: 30,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
  cartItemText: {
    fontSize: 16,
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
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
