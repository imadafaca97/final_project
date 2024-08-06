import CaseModal from "@/components/CaseModal";
import { Endpoints, Incidence } from "@/services/endpoints";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
const IncidentViewing = () => {
    const [incidences, setIncidences] = useState<Incidence[]>([])
    const endpoints = new Endpoints;
  
    const getIncidences = useCallback(() => {
        endpoints.getEvents().then((res: Incidence[]) => {
          setIncidences(res)
        })
    },[])
  
    useEffect(() => {
      getIncidences();
    },[incidences])
  return (
    <View style={styles.container}>
      <FlatList
        data={incidences}
        renderItem={({ item }) => (
          <View style={styles.casesContainer}>
            <CaseModal
              date={item.date}
              title={item.title}
              description={item.description}
              photo={item.photo}
            />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
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
  casesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  delete: {
    backgroundColor: "#FF0000",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
});
export default IncidentViewing;
