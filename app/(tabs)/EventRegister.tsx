import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Endpoints, Incidence } from "@/services/endpoints";

const EventRegister = () => {
  const endpoints = new Endpoints();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [educationalCenter, setEducationalCenter] = useState("");
  const [district, setDistrict] = useState("");
  const [regional, setRegional] = useState("");

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

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      return false;
    }
  };
  const onSubmit = async () => {
    const payload: Incidence = {
      date: date.toLocaleDateString("de-DE"),
      title,
      description,
      photo: image,
      educationalCenter,
      regional,
      district,
    };

    console.log({      title,date,
      description,
      photo: image,
      educationalCenter,
      regional,
      district,})
    
    await endpoints
      .registerEvent(payload)
      .then(() => {
        alert("Se ha guardado");
        setImage("");
        setTitle("");
        setDate(new Date());
        setDescription("");
        setRegional("");
        setEducationalCenter("");
        setDistrict("");
      })
      .catch(() => alert("Ha ocurrido un error"));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Incidencias</Text>
        <TextInput
          placeholder="Titulo"
          placeholderTextColor="#cfcfcf"
          value={title}
          onChangeText={setTitle}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Centro educativo"
          placeholderTextColor="#cfcfcf"
          value={educationalCenter}
          onChangeText={setEducationalCenter}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Regional"
          placeholderTextColor="#cfcfcf"
          value={regional}
          onChangeText={setRegional}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Distrito"
          placeholderTextColor="#cfcfcf"
          value={district}
          onChangeText={setDistrict}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Titulo"
          placeholderTextColor="#cfcfcf"
          value={description}
          onChangeText={setDescription}
          style={styles.textInput}
        />
        <DateTimePicker
          mode="date"
          value={date}
          onChange={onChange}
          style={{ marginBottom: 20 }}
        />
        <View>
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
        <TouchableOpacity style={styles.submit} onPress={onSubmit}>
          <Text style={{ color: "white" }}>Enviar Todo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    textInput: {
      height: 40,
      width: "90%",
      margin: 10,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    image: {
      width: 350,
      height: 300,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 5,
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
    submit: {
      height: 50,
      width: "90%",
      backgroundColor: "#5DCCF9",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
  });

export default EventRegister;

