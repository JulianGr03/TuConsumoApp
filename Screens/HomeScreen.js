import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue, set } from 'firebase/database';
// Asegúrate de que esta ruta sea correcta según tus carpetas
import { database } from '../database/firebaseConfig'; 

const logoImg = require('../assets/TuConsumoAppHome.png');

export default function HomeScreen({ navigation }) {
  // Estado para guardar los datos en tiempo real de Firebase
  const [datosConsumo, setDatosConsumo] = useState({
    voltaje: 0,
    corriente: 0,
    potencia_w: 0,
    kwh_total: 0,
    estado: false
  });

  // Escuchar los datos de Firebase al cargar la pantalla
  useEffect(() => {
    const enchufeRef = ref(database, 'Enchufe_01');
    const unsubscribe = onValue(enchufeRef, (snapshot) => {
      if (snapshot.exists()) {
        setDatosConsumo(snapshot.val());
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Función para cambiar el estado del relé desde el Switch
  const toggleEnchufe = (nuevoEstado) => {
    const estadoRef = ref(database, 'Enchufe_01/estado');
    set(estadoRef, nuevoEstado);
  };

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
          <Text style={styles.greetingTitle}>¡Hola Jesús!</Text>
          <Text style={styles.greetingSubtitle}>Hoy</Text>
        </View>

        {/* 3. Consumo Actual (Conectado a Firebase) */}
        <View style={styles.consumptionSection}>
          <Text style={styles.consumptionLabel}>Consumo Actual (kWh)</Text>
          <Text style={styles.consumptionValue}>
            {Number(datosConsumo.kwh_total).toFixed(4)}
          </Text>
        </View>

        {/* 4. Dispositivos Encendidos */}
        <View style={styles.devicesSection}>
          <Text style={styles.devicesTitle}>DISPOSITIVOS</Text>

          {/* Tarjeta Única: Enchufe Inteligente */}
          <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>Enchufe Inteligente</Text>
            <Switch
              trackColor={{ false: "#D1D1D6", true: "#4CA1D5" }}
              thumbColor={Platform.OS === 'ios' ? "#FFFFFF" : (datosConsumo.estado ? "#FFFFFF" : "#F4F3F4")}
              onValueChange={toggleEnchufe}
              value={datosConsumo.estado}
            />
          </View>
        </View>

      </View>

      {/* 5. Barra de Navegación Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={28} color="#4CA1D5" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace("AverageScreen")}>
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
    backgroundColor: '#E8F4FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 40 : 10,
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
    backgroundColor: '#F7FBFE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    paddingBottom: Platform.OS === 'ios' ? 30 : 15, 
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});