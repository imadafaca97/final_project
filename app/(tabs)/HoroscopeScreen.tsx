import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HoroscopeScreen = () => {
  const [selectedSign, setSelectedSign] = useState('aries'); // Signo zodiacal predeterminado
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);

  const signs = [
    { name: 'Aries', value: 'aries' },
    { name: 'Tauro', value: 'taurus' },
    { name: 'Géminis', value: 'gemini' },
    { name: 'Cáncer', value: 'cancer' },
    { name: 'Leo', value: 'leo' },
    { name: 'Virgo', value: 'virgo' },
    { name: 'Libra', value: 'libra' },
    { name: 'Escorpio', value: 'scorpio' },
    { name: 'Sagitario', value: 'sagittarius' },
    { name: 'Capricornio', value: 'capricorn' },
    { name: 'Acuario', value: 'aquarius' },
    { name: 'Piscis', value: 'pisces' },
  ];

  useEffect(() => {
    fetchHoroscope();
  }, [selectedSign]);

  const fetchHoroscope = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://aztro.sameerkumar.website?sign=${selectedSign}&day=today`);
      console.log(response.data)
      setHoroscope(response.data.description);
    } catch (error) {
      console.error('Error al obtener el horóscopo', error);
      setHoroscope('No se pudo obtener el horóscopo. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.signItem, selectedSign === item.value && styles.selectedSign]}
      onPress={() => setSelectedSign(item.value)}
    >
      <Text style={styles.signText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horóscopo Diario</Text>
      <FlatList
        data={signs}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        horizontal
        style={styles.signList}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.horoscopeText}>{horoscope}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  signList: {
    flexGrow: 0,
    marginBottom: 20,
  },
  signItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  selectedSign: {
    backgroundColor: '#add8e6',
  },
  signText: {
    fontSize: 18,
  },
  horoscopeText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HoroscopeScreen;
