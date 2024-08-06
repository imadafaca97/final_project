import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View, ActivityIndicator } from "react-native";

const About = () => {
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data !== null) {
          setUserData(JSON.parse(data));
          setLoading(false)
        }
      } catch (error) {
        console.error("Error al recuperar los datos del usuario", error);
      }
    };
    fetchVisits();
  }, [userData]);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando mi informacion...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/profile_picture.jpg")}
        style={styles.image}
      />
      <Text style={styles.boldText}>{userData!.nombre + " "}{userData!.apellido}</Text>
      <Text style={styles.boldText}>{userData!.correo}</Text>
      <Text style={styles.boldText}>2021-1096</Text>
      <Text style={styles.boldText}>
        Un buen maestro puede inspirar esperanza, encender la imaginación e
        inculcar amor por el aprendizaje.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 300,
    borderRadius: 5,
    resizeMode: "stretch",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    paddingTop: 60,
    padding: 10,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default About;
