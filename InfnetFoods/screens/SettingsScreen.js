import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.title, { color: theme.color }]}>Configurações</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#007BFF' }]} 
            onPress={toggleTheme}
          >
            <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Alterar Tema</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SettingsScreen;
