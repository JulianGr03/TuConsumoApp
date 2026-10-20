import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const logoImg = require('../assets/TuConsumoAppLOGO.png');

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="Dark" />
      
      {/* Sección Superior - Fondo General */}
      <View style={styles.topSection}>
        <Image source={logoImg} style={styles.logoImage} resizeMode="contain" />
      </View>

      {/* Sección Inferior - Usamos ScrollView para poder desplazar si hay muchos inputs */}
      <View 
        style={styles.bottomSection}
      >
        <Text style={styles.loginTitle}>Regístrate</Text>

        <View style={styles.inputSection}>
          
          <View style={styles.inputContainer}>
            <Text style={styles.iconPlaceholder}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#6B7280"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.iconPlaceholder}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@gmail.com"
              placeholderTextColor="#6B7280"
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
              placeholder="Contraseña"
              placeholderTextColor="#6B7280"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>

        </View>

        <TouchableOpacity style={styles.sendButton} onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.sendButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.linkText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
            <Text style={styles.linkTextBlue}>Inicia Sesión</Text>
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
  sendButton: {
    width: '100%',
    backgroundColor: '#346073', // Morado intenso para el botón
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