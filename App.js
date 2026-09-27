import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const logoImg = require('./assets/Nombre-App.png');
const outletCharImg = require('./assets/Logo-App-2.png');

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Intento de inicio de sesión:', email, password);
    // Agrega aquí tu lógica de autenticación
    alert('Función de inicio de sesión no implementada.');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.contentCard}>

        <View style={styles.logoSection}>
          <Image source={logoImg} style={styles.logoImage} resizeMode="contain" />
        </View>

        <Image source={outletCharImg} style={styles.characterImage} resizeMode="contain" />

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
          <Text style={styles.welcomeSubtitle}>Ingresa aquí:</Text>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="correo electrónico"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="contraseña"
            placeholderTextColor="#666"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={handleLogin}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>

        <View style={styles.linksSection}>
          <View style={styles.linkRow}>
            <Text style={styles.linkText}>¿olvidaste tu contraseña?</Text>
            <TouchableOpacity onPress={() => alert('Recuperar contraseña')}>
              <Text style={styles.linkTextBlue}>consulta aquí.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkRow}>
            <Text style={styles.linkText}>¿Aún no tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => alert('Registrar cuenta')}>
              <Text style={styles.linkTextBlue}>Regístrate aquí.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCard: {
    width: '100%',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: -20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  logoImage: {
    width: '85%', 
    height: 50,
    marginBottom: 10,
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    width: '75%',
  },
  characterImage: {
    width: '70%',
    height: 180,
    marginVertical: 15,
  },
  welcomeSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#444',
  },
  inputSection: {
    width: '100%',
    marginVertical: 15,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',

  },
  sendButton: {
    width: 'auto', // Se ajusta al contenido como en la imagen
    backgroundColor: '#386676', // Color azul-teja oscuro del botón
    borderRadius: 25, // Botón muy redondeado
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignSelf: 'center', // Alinear a la derecha
    marginTop: 10,
    marginBottom: 20,
  },
  sendButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  linksSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 12, 
    color: '#444',
  },
  linkTextBlue: {
    fontSize: 12,
    color: '#4A89DC', // Color azul para los enlaces
    fontWeight: 'bold',
    marginLeft: 3, // Espacio sutil entre el texto y el enlace
  },
});