import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../database/firebaseConfig'; 

export default function AverageScreen({ navigation }) {
  const [periodo, setPeriodo] = useState('Semana');

  // Estados para datos en vivo y almacenamiento del historial completo
  const [datosEnVivo, setDatosEnVivo] = useState({ voltaje: 0, corriente: 0, potencia_w: 0, kwh_total: 0, estado: false });
  const [historialFirebase, setHistorialFirebase] = useState({});

  // Estados calculados para los resúmenes, gráfica y análisis de pico dinámico
  const [consumoResumen, setConsumoResumen] = useState({ dia: 0, semana: 0, mes: 0, anio: 0 });
  const [picoInfo, setPicoInfo] = useState({ diaTexto: 'Sin registros', maxKwh: 0 });
  const [graficaDatos, setGraficaDatos] = useState([
    { dia: 'Lun', valor: 0 },
    { dia: 'Mar', valor: 0 },
    { dia: 'Mié', valor: 0 },
    { dia: 'Jue', valor: 0 },
    { dia: 'Vie', valor: 0 },
    { dia: 'Sáb', valor: 0 },
    { dia: 'Dom', valor: 0 },
  ]);

  // 1. Escuchar datos en vivo y el historial desde Firebase
  useEffect(() => {
    // Referencia al enchufe en vivo
    const enchufeRef = ref(database, 'Enchufe_01');
    const unsubEnchufe = onValue(enchufeRef, (snapshot) => {
      if (snapshot.exists()) setDatosEnVivo(snapshot.val());
    });

    // Referencia al Historial completo (/Historial)
    const historialRef = ref(database, 'Historial');
    const unsubHistorial = onValue(historialRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setHistorialFirebase(data);
        procesarHistorial(data);
      }
    });

    return () => {
      unsubEnchufe();
      unsubHistorial();
    };
  }, []);

  // 2. Función para procesar y calcular los valores de Día, Semana, Mes, Año y Pico
  const procesarHistorial = (data) => {
    const hoy = new Date();
    const anioActual = String(hoy.getFullYear());
    const mesActual = String(hoy.getMonth() + 1).padStart(2, '0');
    const diaActualStr = String(hoy.getDate()).padStart(2, '0');

    // Diccionario para convertir el número del mes en texto
    const nombresMeses = {
      '01': 'enero', '02': 'febrero', '03': 'marzo', '04': 'abril',
      '05': 'mayo', '06': 'junio', '07': 'julio', '08': 'agosto',
      '09': 'septiembre', '10': 'octubre', '11': 'noviembre', '12': 'diciembre'
    };
    const nombreMesActual = nombresMeses[mesActual] || '';

    let consumoHoy = 0;
    let sumaMes = 0;
    let diasMesCount = 0;
    let sumaAnio = 0;

    let diaMayorConsumo = 'Sin registros';
    let maxKwhDia = 0;

    // Obtener consumo del día de hoy si existe en la estructura /Historial/YYYY/MM/DD
    if (data[anioActual] && data[anioActual][mesActual] && data[anioActual][mesActual][diaActualStr]) {
      consumoHoy = Number(data[anioActual][mesActual][diaActualStr]) || 0;
    }

    // Calcular mes actual y buscar el día con mayor consumo en el mes en curso
    if (data[anioActual] && data[anioActual][mesActual]) {
      const diasMes = data[anioActual][mesActual];
      Object.entries(diasMes).forEach(([dia, val]) => {
        const consumoNum = Number(val) || 0;
        sumaMes += consumoNum;
        diasMesCount++;

        if (consumoNum > maxKwhDia) {
          maxKwhDia = consumoNum;
          diaMayorConsumo = `Día ${dia} de ${nombreMesActual}`;
        }
      });
    }

    // Calcular año actual
    if (data[anioActual]) {
      const mesesAnio = data[anioActual];
      Object.values(mesesAnio).forEach(diasDelMes => {
        Object.values(diasDelMes).forEach(val => {
          sumaAnio += Number(val) || 0;
        });
      });
    }

    // Calcular promedio semanal aproximado basado en el mes
    const promedioSemana = diasMesCount > 0 ? (sumaMes / diasMesCount) * 7 : 0;

    setConsumoResumen({
      dia: consumoHoy,
      semana: promedioSemana,
      mes: sumaMes,
      anio: sumaAnio
    });

    setPicoInfo({
      diaTexto: diaMayorConsumo,
      maxKwh: maxKwhDia
    });

    // Rellenar la gráfica de la semana actual (Lunes a Domingo)
    const diasSemanaNombres = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    let nuevaGrafica = diasSemanaNombres.map(d => ({ dia: d, valor: 0 }));

    if (data[anioActual] && data[anioActual][mesActual]) {
      const diasMesObj = data[anioActual][mesActual];
      Object.keys(diasMesObj).forEach(diaStr => {
        const fechaDia = new Date(Number(anioActual), Number(mesActual) - 1, Number(diaStr));
        let jsDay = fechaDia.getDay(); // 0 es Domingo, 1 es Lunes...
        let indexGrafica = jsDay === 0 ? 6 : jsDay - 1;
        nuevaGrafica[indexGrafica].valor = Number(diasMesObj[diaStr]) || 0;
      });
    }
    setGraficaDatos(nuevaGrafica);
  };

  const toggleRele = () => {
    const estadoRef = ref(database, 'Enchufe_01/estado');
    set(estadoRef, !datosEnVivo.estado);
  };

  // Obtener el valor que se mostrará en la tarjeta de resumen según el período seleccionado
  const obtenerValorResumen = () => {
    switch (periodo) {
      case 'Día': return Number(consumoResumen.dia).toFixed(4);
      case 'Semana': return Number(consumoResumen.semana).toFixed(2);
      case 'Mes': return Number(consumoResumen.mes).toFixed(2);
      case 'Año': return Number(consumoResumen.anio).toFixed(2);
      default: return '0.00';
    }
  };

  // Auto-escalado de la gráfica
  const maxConsumo = Math.max(...graficaDatos.map(d => d.valor), 1.2);
  const ejeY = [
    maxConsumo.toFixed(1),
    (maxConsumo * 0.75).toFixed(1),
    (maxConsumo * 0.5).toFixed(1),
    (maxConsumo * 0.25).toFixed(1),
    '0'
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.subtitle}>Promedio de consumo</Text>

          {/* Selector de período */}
          <View style={styles.periodSelector}>
            {['Día', 'Semana', 'Mes', 'Año'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.periodButton, periodo === item && styles.periodButtonActive]}
                onPress={() => setPeriodo(item)}
              >
                <Text style={[styles.periodText, periodo === item && styles.periodTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Resumen de consumo dinámico */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>
              {periodo === 'Día' ? 'Consumo de hoy' : periodo === 'Semana' ? 'Proyección semanal' : periodo === 'Mes' ? 'Consumo total del mes' : 'Consumo total del año'}
            </Text>
            <Text style={styles.summaryValue}>
              {obtenerValorResumen()} kWh
            </Text>
            <Text style={styles.summaryDescription}>
              Calculado automáticamente desde el historial de Firebase
            </Text>
          </View>

          {/* TIEMPO REAL Y CONTROL */}
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>TIEMPO REAL Y CONTROL</Text>
            
            <View style={styles.realTimeCard}>
              <View style={styles.realTimeDataRow}>
                <View style={styles.realTimeItem}>
                  <Text style={styles.realTimeLabel}>Voltaje</Text>
                  <Text style={styles.realTimeValue}>{datosEnVivo.voltaje} V</Text>
                </View>
                <View style={styles.realTimeItem}>
                  <Text style={styles.realTimeLabel}>Corriente</Text>
                  <Text style={styles.realTimeValue}>{datosEnVivo.corriente} A</Text>
                </View>
                <View style={styles.realTimeItem}>
                  <Text style={styles.realTimeLabel}>Potencia</Text>
                  <Text style={styles.realTimeValue}>{datosEnVivo.potencia_w} W</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.relayButton, datosEnVivo.estado ? styles.relayButtonOff : styles.relayButtonOn]} 
                onPress={toggleRele}
              >
                <Ionicons name="power" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.relayButtonText}>
                  {datosEnVivo.estado ? 'APAGAR ENCHUFE' : 'ENCENDER ENCHUFE'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Gráfica con datos reales del Historial */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Consumo de la Semana (kWh)</Text>
            <View style={styles.chart}>
              
              <View style={styles.yAxis}>
                {ejeY.map((val, index) => (
                  <Text key={index} style={styles.axisText}>{val}</Text>
                ))}
              </View>

              <View style={styles.barsArea}>
                <View style={styles.grid}>
                  {[1, 2, 3, 4, 5].map((line) => (
                    <View key={line} style={styles.gridLine} />
                  ))}
                </View>

                {graficaDatos.map((item, index) => (
                  <View key={item.dia} style={styles.barColumn}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: maxConsumo > 0 ? `${(item.valor / maxConsumo) * 100}%` : '0%',
                          backgroundColor: item.valor >= (maxConsumo * 0.8) && item.valor > 0 ? '#3186E8' : index % 2 === 0 ? '#48C96A' : '#70D88A',
                        },
                      ]}
                    />
                    <Text style={styles.dayLabel}>{item.dia}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Análisis de pico dinámico con mes en texto */}
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>ANÁLISIS DE PICO</Text>
            <View style={styles.peakCard}>
              <View style={styles.peakIcon}>
                <Ionicons name="flash" size={24} color="#EAB308" />
              </View>
              <View style={styles.peakInfo}>
                <Text style={styles.peakTitle}>Mayor consumo registrado</Text>
                <Text style={styles.peakTime}>{picoInfo.diaTexto}</Text>
                <Text style={styles.peakDescription}>Total: {picoInfo.maxKwh.toFixed(4)} kWh</Text>
              </View>
            </View>
          </View>

          {/* Consejo */}
          <View style={styles.tipCard}>
            <Ionicons name="leaf-outline" size={24} color="#299C61" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Consejo energético</Text>
              <Text style={styles.tipText}>
                Revisa tus consumos mensuales para identificar aparatos que generan gastos fantasma.
              </Text>
            </View>
          </View>

        </ScrollView>

        {/* Navegación inferior */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('HomeScreen')}>
            <Ionicons name="home-outline" size={27} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="stats-chart" size={29} color="#4CA1D5" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('SettingScreen')}>
            <Ionicons name="settings-outline" size={27} color="#000" />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E8F4FA' },
  container: { flex: 1, backgroundColor: '#E8F4FA' },
  scrollContent: { paddingHorizontal: 22, paddingBottom: 25 },
  subtitle: { textAlign: 'center', fontSize: 20, color: '#344B5A', marginTop: 50, marginBottom: 22 },
  periodSelector: { flexDirection: 'row', backgroundColor: '#F7FBFE', borderRadius: 22, padding: 4, marginBottom: 20 },
  periodButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 18 },
  periodButtonActive: { backgroundColor: '#4CA1D5' },
  periodText: { color: '#303B44', fontSize: 13 },
  periodTextActive: { color: '#FFFFFF', fontWeight: 'bold' },
  summaryCard: { backgroundColor: '#F7FBFE', borderRadius: 18, padding: 18, marginBottom: 22, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3 },
  summaryLabel: { fontSize: 14, color: '#596D79' },
  summaryValue: { fontSize: 34, fontWeight: 'bold', color: '#28465A', marginVertical: 6 },
  summaryDescription: { fontSize: 12, color: '#71838E', textAlign: 'center' },
  chartCard: { backgroundColor: '#F7FBFE', borderRadius: 18, padding: 16, marginBottom: 28 },
  chartTitle: { fontSize: 16, fontWeight: 'bold', color: '#263D4B', marginBottom: 20 },
  chart: { height: 180, flexDirection: 'row' },
  yAxis: { width: 35, justifyContent: 'space-between', paddingBottom: 23 },
  axisText: { fontSize: 10, color: '#647783' },
  barsArea: { flex: 1, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around', position: 'relative' },
  grid: { position: 'absolute', top: 0, bottom: 23, left: 0, right: 0, justifyContent: 'space-between' },
  gridLine: { height: 1, backgroundColor: '#DDEAF0' },
  barColumn: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 3 },
  bar: { width: '70%', maxWidth: 27, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  dayLabel: { fontSize: 10, color: '#425563', marginTop: 6, marginBottom: 3 },
  chartNote: { fontSize: 10, color: '#71838E', textAlign: 'center', marginTop: 12 },
  analysisSection: { marginBottom: 22 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#263D4B', marginBottom: 12, letterSpacing: 0.5 },
  peakCard: { backgroundColor: '#F7FBFE', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  peakIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#FFF5CF', justifyContent: 'center', alignItems: 'center', marginRight: 13 },
  peakInfo: { flex: 1 },
  peakTitle: { fontSize: 15, fontWeight: 'bold', color: '#263D4B' },
  peakTime: { fontSize: 14, color: '#3186E8', fontWeight: '600', marginTop: 4 },
  peakDescription: { fontSize: 11, color: '#71838E', marginTop: 4 },
  tipCard: { backgroundColor: '#E0F4E8', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  tipContent: { flex: 1, marginLeft: 12 },
  tipTitle: { fontSize: 14, fontWeight: 'bold', color: '#247A4D', marginBottom: 5 },
  tipText: { fontSize: 12, lineHeight: 18, color: '#365C48' },
  bottomNav: { backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingBottom: Platform.OS === 'ios' ? 25 : 10 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 },
  realTimeCard: { backgroundColor: '#F7FBFE', borderRadius: 15, padding: 15, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3 },
  realTimeDataRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DDEAF0', paddingBottom: 15 },
  realTimeItem: { alignItems: 'center', flex: 1 },
  realTimeLabel: { fontSize: 12, color: '#71838E', marginBottom: 4 },
  realTimeValue: { fontSize: 16, fontWeight: 'bold', color: '#3186E8' },
  relayButton: { flexDirection: 'row', paddingVertical: 12, borderRadius: 25, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  relayButtonOn: { backgroundColor: '#48C96A' },
  relayButtonOff: { backgroundColor: '#E57373' },
  relayButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5 },
});