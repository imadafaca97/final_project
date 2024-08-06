import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Define los tipos para la respuesta de la API
interface WeatherResponse {
  weather: Array<{ description: string }>;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const API_KEY = '2251e7160a14d26752f59ce153bcd1fb'; // Reemplaza con tu clave de OpenWeatherMap

const WeatherScreen = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get<WeatherResponse>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error al obtener el clima', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estado del Clima</Text>
      <TextInput
        style={styles.input}
        placeholder="Latitud"
        placeholderTextColor="#cfcfcf"
        value={latitude}
        onChangeText={setLatitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitud"
        placeholderTextColor="#cfcfcf"
        value={longitude}
        onChangeText={setLongitude}
      />
      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Obtener Clima</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherText}>Clima: {weatherData.weather[0].description}</Text>
            <Text style={styles.weatherText}>Temperatura: {weatherData.main.temp}°C</Text>
            <Text style={styles.weatherText}>Humedad: {weatherData.main.humidity}%</Text>
            <Text style={styles.weatherText}>Viento: {weatherData.wind.speed} m/s</Text>
          </View>
        )
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default WeatherScreen;
