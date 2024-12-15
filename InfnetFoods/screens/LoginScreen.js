import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen({ setIsAuthenticated }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const mockUser = { email: 'aaa@m.com', password: 'aa' };

  const handleLogin = () => {
    setErrorMessage('');

    if (!validateEmail(email) || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (email !== mockUser.email || password !== mockUser.password) {
      setErrorMessage('Credenciais inválidas.');
      return;
    }

    setIsAuthenticated(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.color }]}>Login</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.cardBorderColor, backgroundColor: theme.cardBackgroundColor, color: theme.color }]}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.cardBorderColor, backgroundColor: theme.cardBackgroundColor, color: theme.color }]}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errorMessage ? <Text style={[styles.error, { color: theme.errorColor }]}>{errorMessage}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} color={theme.buttonColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    marginBottom: 10,
    textAlign: 'center',
  },
});
