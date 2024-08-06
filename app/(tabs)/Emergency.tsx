import { Endpoints } from "@/services/endpoints";
import { useCallback } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
const Emergency = () => {
  const endpoints = new Endpoints();

  const deleteAll = useCallback(async () => {
    console.log('hola mundo')
    await endpoints.deleteIncidences();
  }, []);
  return (
    <View>
      <Pressable style={styles.delete} onPress={() => deleteAll()}>
        <Text style={{ color: "white" }}>ELIMINAR TODO</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 10,
    alignItems: "center",
  },
  delete: {
    backgroundColor: "#FF0000",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Emergency;
