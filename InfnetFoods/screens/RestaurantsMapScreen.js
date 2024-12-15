import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const restaurants = [
  {
    id: '1',
    name: 'Bar do Bigode',
    cuisine: 'Culinária Brasileira',
    rating: 4.5,
    description: 'Restaurante com serviço de entrega.',
  },
  {
    id: '2',
    name: 'Kinoa Culinária Afetiva',
    cuisine: 'Comida Caseira',
    rating: 4.0,
    description: 'Pratos tradicionais com toque afetivo.',
  },
  {
    id: '3',
    name: 'Restaurante Japonês Mestre Kami',
    cuisine: 'Japonês',
    rating: 4.8,
    description: 'Temakis e sushis em atmosfera casual.',
  },
  {
    id: '4',
    name: 'Contemporâneo Lapa',
    cuisine: 'Contemporâneo',
    rating: 4.3,
    description: 'Pratos gourmet em ambiente descontraído.',
  },
  {
    id: '5',
    name: 'Nova Lapa',
    cuisine: 'Buffet',
    rating: 4.2,
    description: 'Buffet casual com carnes grelhadas.',
  },
  {
    id: '6',
    name: 'Bar e Restaurante Figueira',
    cuisine: 'Brasileiro',
    rating: 4.7,
    description: 'Ambiente tradicional com pratos regionais.',
  },
  {
    id: '7',
    name: 'Restaurante Bar Brasil',
    cuisine: 'Alemã',
    rating: 4.6,
    description: 'Culinária alemã desde 1907.',
  },
  {
    id: '8',
    name: 'Sushi Yapa',
    cuisine: 'Japonês',
    rating: 4.4,
    description: 'Temakeria e sushi bar contemporâneo.',
  },
  {
    id: '9',
    name: 'La Bocca Bar & Trattoria',
    cuisine: 'Italiano',
    rating: 4.5,
    description: 'Comida italiana com clima moderno.',
  },
  {
    id: '10',
    name: "Domino's Pizza",
    cuisine: 'Pizzaria',
    rating: 4.0,
    description: 'Famosa rede de pizzarias com entrega.',
  },
];

export default function RestaurantsScreen() {
  const [showMap, setShowMap] = useState(false);
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.color }]}>
        Restaurantes no Centro do Rio
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonColor }]}
        onPress={() => setShowMap(!showMap)}>
        <Text style={[styles.buttonText, { color: theme.color }]}>
          {showMap ? 'Ocultar Mapa' : 'Ver Mapa com Restaurantes'}
        </Text>
      </TouchableOpacity>

      {showMap && (
        <Image
          source={require('./../assets/CentroDoRio.png')}
          style={styles.mapImage}
        />
      )}

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.restaurantItem,
              { backgroundColor: theme.cardBackgroundColor },
            ]}>
            <Text style={[styles.restaurantName, { color: theme.color }]}>
              {item.name}
            </Text>
            <Text style={[styles.cuisine, { color: theme.color }]}>
              {item.cuisine}
            </Text>
            <Text style={{ color: theme.color }}>
              Rating: {item.rating} / 5
            </Text>
            <Text style={{ color: theme.color }}>{item.description}</Text>
          </View>
        )}
        style={styles.list}
      />
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
  mapImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  restaurantItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cuisine: {
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
