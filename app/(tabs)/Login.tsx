import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Endpoints } from "@/services/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation, onLogin }: any) => {
  const endpoints = new Endpoints();
  const [cedula, setCedula] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("cedula", cedula);
    formData.append("clave", clave);

    setLoading(true);

    try {
      const res = await endpoints.login(formData);

      await AsyncStorage.setItem("userData", JSON.stringify(res.datos)).then(() => {
        onLogin();
        navigation.navigate('Registrar incidentes');
      });
    } catch (error) {
      console.error("Error en el login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesion</Text>
        <TextInput
          placeholder="Cedula"
          placeholderTextColor="#cfcfcf"
          value={cedula}
          onChangeText={setCedula}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Clave"
          placeholderTextColor="#cfcfcf"
          textContentType="newPassword"
          secureTextEntry={true}
          value={clave}
          onChangeText={setClave}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.submit} onPress={onSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "white" }}>Iniciar sesion</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
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

export default Login;
