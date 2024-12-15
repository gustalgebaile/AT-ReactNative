import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const categories = [
  { id: '1', name: 'Lanches' },
  { id: '2', name: 'Chinesa' },
  { id: '3', name: 'Sobremesas' },
  { id: '4', name: 'Japonesa' },
  { id: '5', name: 'Saladas' },
  { id: '6', name: 'Pizza' },
];

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();

  const handleCategoryPress = (category) => {
    navigation.navigate('Products', { category });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor: theme.cardBackgroundColor }]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={[styles.categoryText, { color: theme.color }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.color }]}>Categorias</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        contentContainerStyle={styles.list} />
      
      <TouchableOpacity
        style={[styles.profileButton, { backgroundColor: theme.buttonBackgroundColor }]}
        onPress={() => navigation.navigate('Profile')} >
        <Text style={[styles.profileButtonText, { color: theme.buttonTextColor }]}>Ir para o Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.profileButton, { backgroundColor: theme.buttonBackgroundColor }]}
        onPress={() => navigation.navigate('Orders')} >
        <Text style={[styles.profileButtonText, { color: theme.buttonTextColor }]}>Meus Pedidos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.profileButton, { backgroundColor: theme.buttonBackgroundColor }]}
        onPress={() => navigation.navigate('Restaurant Details')} >
        <Text style={[styles.profileButtonText, { color: theme.buttonTextColor }]}>Ver Restaurantes no Mapa</Text>
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
  categoryItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 16,
  },
});
