import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { College, Endpoints } from "@/services/endpoints";

const CollegeById = () => {
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [schoolInfo, setSchoolInfo] = useState<College | undefined | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const endpoints = new Endpoints();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await endpoints.getCollegeById();
      if (response.exito) {
        const college = response.datos.find((x) => x.idx === schoolId);
        setSchoolInfo(college);
        setError(null);
      } else {
        setSchoolInfo(null);
        setError("No se encontró información para este ID.");
      }
    } catch (err) {
      setError("Ha ocurrido un error al buscar la información.");
      setSchoolInfo(null);
    }
    finally {
      setLoading(false);
    }
  };

  const IsLoadingComponent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando colegio...</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Información del Colegio</Text>
      <TextInput
        placeholder="Número del colegio"
        placeholderTextColor="#cfcfcf"
        value={schoolId}
        onChangeText={setSchoolId}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        title="Buscar"
        onPress={() => {
          Keyboard.dismiss();
          setSchoolInfo(null)
          handleSearch();
        }}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <IsLoadingComponent />
      {schoolInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Código: {schoolInfo.codigo}</Text>
          <Text style={styles.infoText}>Nombre: {schoolInfo.nombre}</Text>
          <Text style={styles.infoText}>
            Coordenadas: {schoolInfo.coordenadas}
          </Text>
          <Text style={styles.infoText}>Distrito: {schoolInfo.distrito}</Text>
          <Text style={styles.infoText}>Regional: {schoolInfo.regional}</Text>
          <Text style={styles.infoText}>
            Distrito Municipal: {schoolInfo.d_dmunicipal}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CollegeById;
