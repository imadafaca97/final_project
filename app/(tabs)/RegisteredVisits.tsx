import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import User, { Endpoints } from '@/services/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const RegisteredVisits = () => {
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
          console.log(result.datos[0])
          console.log(data)
          setVisits(result.datos)
        }
      } catch (error) {
        console.error("Error al recuperar los datos del usuario", error);
      }
    };
    fetchVisits();
  }, [selectedVisit]);

  const renderVisitItem = ({ item }: { item: SchoolVisit }) => (
    <TouchableOpacity
      style={styles.visitItem}
      onPress={() => {
        setSelectedVisit(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.visitText}>Codigo: {item.codigo_centro}</Text>
      <Text style={styles.visitText}>Nombre: {item.cedula_director}</Text>
      <Text style={styles.visitText}>Motivo: {item.motivo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas mis visitas</Text>
      <FlatList
        data={visits}
        renderItem={renderVisitItem}
        keyExtractor={(item) => item.id}
      />

      {selectedVisit && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalles de la visita</Text>
            <Text>ID: {selectedVisit.id}</Text>
            <Text>Cedula del director: {selectedVisit.cedula_director}</Text>
            <Text>Codigo de la escuela: {selectedVisit.codigo_centro}</Text>
            <Text>Motivo: {selectedVisit.motivo}</Text>
            <Text>Latitud: {selectedVisit.latitud}</Text>
            <Text>Longitud: {selectedVisit.longitud}</Text>
            <Text>Fecha: {selectedVisit.fecha}</Text>
            <Text>Hora: {selectedVisit.hora}</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  visitItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  visitText: {
    fontSize: 16,
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default RegisteredVisits;
