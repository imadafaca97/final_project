import { Endpoints, News } from "@/services/endpoints";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";

const NewsScreen = () => {
  const [newsData, setNewsData] = useState<News[]>();
  const endpoints = new Endpoints();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcNews = async () => {
      try {
        const result = await endpoints.getNews();
        setNewsData(result);
      } catch (error) {
        console.error("Error al recuperar los datos del usuario", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetcNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando noticias...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={newsData}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
              <Text style={styles.newsLink}>Leer más</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  newsItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  newsImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 16,
    color: "#666",
  },
  newsLink: {
    color: "#1E90FF",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default NewsScreen;
