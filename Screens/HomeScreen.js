import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Librería de íconos de Expo

const logoImg = require('../assets/TuConsumoAppHome.png');

export default function HomeScreen({ navigation }) {
  // Estados para controlar los interruptores (On/Off)
  const [tvEncendida, setTvEncendida] = useState(true);
  const [lamparaEncendida, setLamparaEncendida] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.container}>
        
        {/* 1. Logo Superior */}
        <View style={styles.header}>
          <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        </View>

        {/* 2. Saludo */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>¡Hola José!</Text>
          <Text style={styles.greetingSubtitle}>Hoy</Text>
        </View>

        {/* 3. Consumo Actual */}
        <View style={styles.consumptionSection}>
          <Text style={styles.consumptionLabel}>Consumo Actual (KW)</Text>
          <Text style={styles.consumptionValue}>0.85</Text>
        </View>

        {/* 4. Dispositivos Encendidos */}
        <View style={styles.devicesSection}>
          <Text style={styles.devicesTitle}>ENCENDIDOS AHORA</Text>

          {/* Tarjeta: TV Recámara */}
          <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>TV Recámara</Text>
            <Switch
              trackColor={{ false: "#D1D1D6", true: "#4CA1D5" }}
              thumbColor={Platform.OS === 'ios' ? "#FFFFFF" : (tvEncendida ? "#FFFFFF" : "#F4F3F4")}
              onValueChange={setTvEncendida}
              value={tvEncendida}
            />
          </View>

          {/* Tarjeta: Lámpara */}
          <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>Lámpara</Text>
            <Switch
              trackColor={{ false: "#D1D1D6", true: "#4CA1D5" }}
              thumbColor={Platform.OS === 'ios' ? "#FFFFFF" : (lamparaEncendida ? "#FFFFFF" : "#F4F3F4")}
              onValueChange={setLamparaEncendida}
              value={lamparaEncendida}
            />
          </View>
        </View>

      </View>

      {/* 5. Barra de Navegación Inferior (Mockup) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={28} color="#4CA1D5" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart" size={28} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace("SettingScreen")}>
          <Ionicons name="settings-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F4FA', // Color de fondo azul muy claro de la imagen
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 40 : 10, // Ajuste para la barra de estado en Android
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 50,
  },
  greetingSection: {
    marginBottom: 40,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
  },
  greetingSubtitle: {
    fontSize: 20,
    color: '#000',
    marginTop: 5,
  },
  consumptionSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  consumptionLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  consumptionValue: {
    fontSize: 65,
    fontWeight: 'bold',
    color: '#000',
  },
  devicesSection: {
    flex: 1,
  },
  devicesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  deviceCard: {
    backgroundColor: '#F7FBFE', // Blanco con un levísimo tono azulado
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 12,
    // Sombra sutil para darle volumen
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Sombra en Android
  },
  deviceName: {
    fontSize: 16,
    color: '#333',
  },
  bottomNav: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    // Si estás en iPhone con FaceID, esto evita que choque con la barra inferior
    paddingBottom: Platform.OS === 'ios' ? 30 : 15, 
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});