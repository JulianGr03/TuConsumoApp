import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const logoImg = require('../assets/TuConsumoAppHome.png');

export default function SettingScreen({ navigation }) {
  // Estado para la alerta de gasto excesivo[cite: 3]
  const [alertaGasto, setAlertaGasto] = useState(true);

  // Función para cerrar sesión
  const handleLogout = () => {
    // replace evita que el usuario pueda darle "Atrás" y volver a entrar sin contraseña
    navigation.replace('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Logo Superior[cite: 3] */}
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Contenido scrolleable para evitar problemas con pantallas pequeñas */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.mainTitle}>CONFIGURACION Y ALERTAS</Text>

        {/* Sección: Ajustes Generales[cite: 3] */}
        <Text style={styles.sectionTitle}>AJUSTES GENERALES</Text>

        <TouchableOpacity style={styles.settingCard}>
          <Text style={styles.settingText}>Perfil de Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard}>
          <Text style={styles.settingText}>Dispositivos vinculados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard}>
          <Text style={styles.settingText}>Tarifa Eléctrica</Text>
        </TouchableOpacity>

        {/* Sección: Gestión de Alertas[cite: 3] */}
        <Text style={styles.sectionTitle}>GESTIÓN DE ALERTAS</Text>

        <View style={styles.settingCard}>
          <Text style={styles.settingText}>Aviso Gasto Excesivo</Text>
          <Switch
            trackColor={{ false: "#D1D1D6", true: "#0066FF" }} // Tono azul vibrante[cite: 3]
            thumbColor={"#FFFFFF"}
            onValueChange={setAlertaGasto}
            value={alertaGasto}
          />
        </View>

        {/* Botón de Cerrar Sesión (Agregado) */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Barra de Navegación Inferior[cite: 3] */}
      <View style={styles.bottomNav}>
        {/* Botón Home: Ahora navega a la pantalla de inicio */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="home-outline" size={28} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AverageScreen')}>
          <Ionicons name="stats-chart" size={28} color="#000" />
        </TouchableOpacity>
        
        {/* Botón Settings: Resaltado en azul porque estamos en esta pantalla[cite: 3] */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={28} color="#0066FF" />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F4FA', // Fondo azul claro general[cite: 3]
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
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  settingCard: {
    backgroundColor: '#F7FBFE', // Tarjetas blancas/ligeramente azuladas[cite: 3]
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    // Sombra ligera
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEA', // Fondo rojo muy tenue
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 40, // Espacio al final del scroll
    borderWidth: 1,
    borderColor: '#FFD1CF',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30', // Rojo para acción destructiva
    marginLeft: 8,
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