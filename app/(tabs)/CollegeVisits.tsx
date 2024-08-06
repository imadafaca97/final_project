import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { Endpoints } from "@/services/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SchoolVisit {
  id: string;
  cedula_director: string;
  codigo_centro: string;
  motivo: string;
  latitud: string;
  longitud: string;
  fecha: string;
  hora: string;
}

const CollegeVisitsMap = () => {
  const [visits, setVisits] = useState<SchoolVisit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<SchoolVisit | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const endpoints = new Endpoints();

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data !== null) {
          const result = await endpoints.getMyVisits(JSON.parse(data).token);
          setVisits(result.datos)
        }
      } catch (error) {
        console.error("Error al recuperar los datos del usuario", error);
      }
    };
    fetchVisits();
  }, [visits]);

  const onMarkerPress = (visit: SchoolVisit) => {
    setSelectedVisit(visit);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 18.482239,
            longitude: -69.914467,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          {visits.map((visit) => (
            <Marker
              key={visit.id}
              coordinate={{
                latitude: parseFloat(visit.latitud),
                longitude: parseFloat(visit.longitud),
              }}
              onPress={() => onMarkerPress(visit)}
            >
              <Callout>
                <Text>{visit.codigo_centro}</Text>
                <Text>{visit.motivo}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      {selectedVisit && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Visit Details</Text>
            <Text>ID: {selectedVisit.id}</Text>
            <Text>Director's ID: {selectedVisit.cedula_director}</Text>
            <Text>School Code: {selectedVisit.codigo_centro}</Text>
            <Text>Reason: {selectedVisit.motivo}</Text>
            <Text>Latitude: {selectedVisit.latitud}</Text>
            <Text>Longitude: {selectedVisit.longitud}</Text>
            <Text>Date: {selectedVisit.fecha}</Text>
            <Text>Time: {selectedVisit.hora}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    marginTop: 250,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CollegeVisitsMap;