import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const logoImg = require('../assets/TuConsumoAppLOGO.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Intento de inicio de sesión:', email, password);
    alert('Función de inicio de sesión no implementada.');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Sección Superior - Fondo General */}
      <View style={styles.topSection}>
        <Image source={logoImg} style={styles.logoImage} resizeMode="contain" />
      </View>

      {/* Sección Inferior - Tarjeta Superpuesta */}
      <View style={styles.bottomSection}>
        <Text style={styles.loginTitle}>Inicio sesión</Text>

        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.iconPlaceholder}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@gmail.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.iconPlaceholder}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="contraseña"
              placeholderTextColor="#888"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={() => navigation.replace("HomeScreen")}>
          <Text style={styles.sendButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.linkText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
            <Text style={styles.linkTextBlue}>Registrate aquí!</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F3F8', // Fondo oscuro principal
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%', 
    height: 150,
    marginTop: 25,
  },
  bottomSection: {
    flex: 2.2, // Ocupa más espacio que la parte superior
    backgroundColor: '#FFFFFF', // Tarjeta superpuesta un poco más clara
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#346073', // Tono morado claro para el título
    marginBottom: 30,
  },
  inputSection: {
    width: '100%',
    marginBottom: 20,

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9e9e9', // Fondo oscuro para el input
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  iconPlaceholder: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: '#333333',
    fontSize: 15,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  sendButton: {
    width: '100%',
    backgroundColor: '#346073',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  dividerText: {
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 12,
  },
  socialSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  socialCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 13,
    color: '#346073',
  },
  linkTextBlue: {
    fontSize: 13,
    color: '#346073',
    fontWeight: 'bold',
  },
});