import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Endpoints } from "@/services/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogVisit = () => {
  const [directorId, setDirectorId] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [comment, setComment] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [image, setImage] = useState("");

  const endpoints = new Endpoints();

  const handleRegisterVisit = async () => {
    const formData = new FormData();

    formData.append("cedula_director", directorId);
    formData.append("codigo_centro", schoolCode);
    formData.append("motivo", visitReason);
    formData.append("comentario", comment);
    formData.append("foto_evidencia", image);
    formData.append("nota_voz", '');
    formData.append("latitud", latitude);
    formData.append("longitud", longitude);
    formData.append("fecha", date.toISOString().split("T")[0]);
    formData.append("hora", time.toTimeString().split(" ")[0]);
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data !== null) {
        formData.append("token", JSON.parse(data).token);
        await endpoints.LogVisit(formData).then(() => {
          alert('Visita guardada con exito');
          setDirectorId("");
          setSchoolCode("");
          setVisitReason("");
          setComment("");
          setLatitude("");
          setLongitude("");
          setDate(new Date()); 
          setTime(new Date()); 
          setShowDatePicker(false);
          setShowTimePicker(false);
          setImage(""); 
        })
      }
    } catch (error) {
      alert('No se ha podido guardar la visita.')
    }

  };

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      return false;
    }
  };
  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const permissionsResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionsResult.granted === false) {
      return alert("No tienes permiso para tomar fotos");
    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
      return result;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Register School Visit</Text>
        <TextInput
          placeholder="Cedula del director"
          placeholderTextColor="#cfcfcf"
          value={directorId}
          onChangeText={setDirectorId}
          style={styles.input}
        />
        <TextInput
          placeholder="Codigo de la escuela"
          placeholderTextColor="#cfcfcf"
          value={schoolCode}
          onChangeText={setSchoolCode}
          style={styles.input}
        />
        <TextInput
          placeholder="Motivo de la visita"
          placeholderTextColor="#cfcfcf"
          value={visitReason}
          onChangeText={setVisitReason}
          style={styles.input}
        />
        <TextInput
          placeholder="Comentario"
          placeholderTextColor="#cfcfcf"
          value={comment}
          onChangeText={setComment}
          style={styles.input}
        />
        <TextInput
          placeholder="Latitud"
          placeholderTextColor="#cfcfcf"
          value={latitude}
          onChangeText={setLatitude}
          style={styles.input}
        />
        <TextInput
          placeholder="Longitud"
          placeholderTextColor="#cfcfcf"
          value={longitude}
          onChangeText={setLongitude}
          style={styles.input}
        />
        <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <Button title="Seleccionar hora" onPress={() => setShowTimePicker(true)} />
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              setTime(selectedTime || time);
            }}
          />
        )}
        <View style={{marginBottom: 20}}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttons} onPress={selectPhoto}>
              <Text style={{ color: "white" }}>Seleccionar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={takePicture}>
              <Text style={{ color: "white" }}>Tomar foto</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button title="Registrar visita" onPress={handleRegisterVisit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttons: {
    height: 30,
    width: 140,
    backgroundColor: "#5DCCF9",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  image: {
    width: 350,
    height: 300,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default LogVisit;
