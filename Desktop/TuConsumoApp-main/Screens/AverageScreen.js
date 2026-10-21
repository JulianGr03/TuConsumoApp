import React, { useState }  from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,StatusBar,ScrollView,Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AverageScreen( {navigation}) {
    const [periodo, setPeriodo] = useState('Semana');


    //Datos de ejemplo para mostrar las barras
    const consumos = [
        {dia: 'Lun', valor: 0.65},
        {dia: 'Mar', valor: 0.85},
        {dia: 'Mié', valor: 0.72},
        {dia: 'Jue', valor: 0.60},
        {dia: 'Vie', valor: 1.05},
        {dia: 'Sáb', valor: 1.02},
        {dia: 'Dom', valor: 1.03},
    ];

return (
<SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* Encabezado */}
          <Text style={styles.header}>
            TuConsumoApp
          </Text>

          <Text style={styles.subtitle}>
            Promedio de consumo
          </Text>

          {/* Selector de período */}
          <View style={styles.periodSelector}>
            {['Día', 'Semana', 'Mes', 'Año'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.periodButton,
                  periodo === item && styles.periodButtonActive,
                ]}
                onPress={() => setPeriodo(item)}
              >
                <Text
                  style={[
                    styles.periodText,
                    periodo === item && styles.periodTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Resumen de consumo */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>
              Consumo promedio
            </Text>

            <Text style={styles.summaryValue}>
              {periodo === 'Día'
                ? '0.75'
                : periodo === 'Semana'
                ? '5.23'
                : periodo === 'Mes'
                ? '22.40'
                : '268.80'} kWh
            </Text>

            <Text style={styles.summaryDescription}>
              {periodo === 'Día'
                ? 'Promedio diario ilustrativo'
                : periodo === 'Semana'
                ? 'Consumo semanal ilustrativo'
                : periodo === 'Mes'
                ? 'Consumo mensual ilustrativo'
                : 'Consumo anual ilustrativo'}
            </Text>
          </View>

          {/* Gráfica */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>
              Consumo de energía
            </Text>

            <View style={styles.chart}>
              {/* Referencias del eje vertical */}
              <View style={styles.yAxis}>
                <Text style={styles.axisText}>1.2</Text>
                <Text style={styles.axisText}>0.9</Text>
                <Text style={styles.axisText}>0.6</Text>
                <Text style={styles.axisText}>0.3</Text>
                <Text style={styles.axisText}>0</Text>
              </View>

              {/* Barras de consumo */}
              <View style={styles.barsArea}>
                <View style={styles.grid}>
                  {[1, 2, 3, 4, 5].map((line) => (
                    <View key={line} style={styles.gridLine} />
                  ))}
                </View>

                {consumos.map((item, index) => (
                  <View key={item.dia} style={styles.barColumn}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${(item.valor / 1.2) * 100}%`,
                          backgroundColor:
                            item.valor >= 1
                              ? '#3186E8'
                              : index % 2 === 0
                              ? '#48C96A'
                              : '#70D88A',
                        },
                      ]}
                    />

                    <Text style={styles.dayLabel}>
                      {item.dia}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <Text style={styles.chartNote}>
              Valores ilustrativos en kWh
            </Text>
          </View>

          {/* Análisis de pico */}
          <View style={styles.analysisSection}>
            <Text style={styles.sectionTitle}>
              ANÁLISIS DE PICO
            </Text>

            <View style={styles.peakCard}>
              <View style={styles.peakIcon}>
                <Ionicons
                  name="flash"
                  size={24}
                  color="#EAB308"
                />
              </View>

              <View style={styles.peakInfo}>
                <Text style={styles.peakTitle}>
                  Mayor consumo
                </Text>

                <Text style={styles.peakTime}>
                  8:00 PM - 10:00 PM
                </Text>

                <Text style={styles.peakDescription}>
                  Horario de mayor consumo estimado
                </Text>
              </View>
            </View>
          </View>

          {/* Información adicional */}
          <View style={styles.tipCard}>
            <Ionicons
              name="leaf-outline"
              size={24}
              color="#299C61"
            />

            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>
                Consejo energético
              </Text>

              <Text style={styles.tipText}>
                Apaga los dispositivos que no estés
                utilizando para reducir el consumo
                eléctrico de tu hogar.
              </Text>
            </View>
          </View>

        </ScrollView>

        {/* Navegación inferior */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Ionicons
              name="home-outline"
              size={27}
              color="#000"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons
              name="stats-chart"
              size={29}
              color="#4CA1D5"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('SettingScreen')}
          >
            <Ionicons
              name="settings-outline"
              size={27}
              color="#000"
            />
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#E8F4FA',
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 25,
  },

  header: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '900',
    color: '#28465A',
    marginTop: Platform.OS === 'android' ? 18 : 10,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 17,
    color: '#344B5A',
    marginTop: 8,
    marginBottom: 22,
  },

  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F7FBFE',
    borderRadius: 22,
    padding: 4,
    marginBottom: 20,
  },

  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 18,
  },

  periodButtonActive: {
    backgroundColor: '#4CA1D5',
  },

  periodText: {
    color: '#303B44',
    fontSize: 13,
  },

  periodTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  summaryCard: {
    backgroundColor: '#F7FBFE',
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  summaryLabel: {
    fontSize: 14,
    color: '#596D79',
  },

  summaryValue: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#28465A',
    marginVertical: 6,
  },

  summaryDescription: {
    fontSize: 12,
    color: '#71838E',
  },

  chartCard: {
    backgroundColor: '#F7FBFE',
    borderRadius: 18,
    padding: 16,
    marginBottom: 28,
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263D4B',
    marginBottom: 20,
  },

  chart: {
    height: 180,
    flexDirection: 'row',
  },

  yAxis: {
    width: 27,
    justifyContent: 'space-between',
    paddingBottom: 23,
  },

  axisText: {
    fontSize: 10,
    color: '#647783',
  },

  barsArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    position: 'relative',
  },

  grid: {
    position: 'absolute',
    top: 0,
    bottom: 23,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },

  gridLine: {
    height: 1,
    backgroundColor: '#DDEAF0',
  },

  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 3,
  },

  bar: {
    width: '70%',
    maxWidth: 27,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  dayLabel: {
    fontSize: 10,
    color: '#425563',
    marginTop: 6,
    marginBottom: 3,
  },

  chartNote: {
    fontSize: 10,
    color: '#71838E',
    textAlign: 'center',
    marginTop: 12,
  },

  analysisSection: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#263D4B',
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  peakCard: {
    backgroundColor: '#F7FBFE',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },

  peakIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFF5CF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  peakInfo: {
    flex: 1,
  },

  peakTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#263D4B',
  },

  peakTime: {
    fontSize: 14,
    color: '#3186E8',
    fontWeight: '600',
    marginTop: 4,
  },

  peakDescription: {
    fontSize: 11,
    color: '#71838E',
    marginTop: 4,
  },

  tipCard: {
    backgroundColor: '#E0F4E8',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  tipContent: {
    flex: 1,
    marginLeft: 12,
  },

  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#247A4D',
    marginBottom: 5,
  },

  tipText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#365C48',
  },

  bottomNav: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});