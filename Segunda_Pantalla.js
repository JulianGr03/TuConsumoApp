import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.contentCard}>

        <View style={styles.PruebaTitle}>
            <Text style={styles.TitleSegundaPantalla}>Segunda Pantalla xddd</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9', // Fondo gris claro de toda la pantalla
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  PruebaTitle: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: -20, // Ajuste sutil para posicionarlo bien
  },
  contentCard: {
    width: '100%',
    maxWidth: 380, // Limita el ancho en pantallas más grandes
    backgroundColor: '#EBEBEB', // Fondo de la tarjeta central
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1, // Simula el borde oscuro visto en la imagen
    borderColor: '#444', 
  },
  inputSection: {
    width: '100%',
    marginVertical: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F1F1F1', // Fondo de entrada muy claro
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 14,
    color: '#000',
  },
});