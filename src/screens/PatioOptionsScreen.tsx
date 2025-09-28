import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@/components/Header";

const PatioOptionsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { patio } = route.params || { patio: "Pátio não selecionado" };

  return (
    <View style={styles.container}>
      <Header title="Opções do Pátio" />

      <Text style={styles.subtitle}>Pátio selecionado: {patio}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SectorSelection")}
      >
        <Text style={styles.buttonText}>Ver motos do pátio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LocateMoto")}
      >
        <Text style={styles.buttonText}>Localizar moto pela placa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MotoWithoutPlate")}
      >
        <Text style={styles.buttonText}>Buscar moto sem placa (TRIATAG)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatioOptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  button: {
    backgroundColor: "#26548b",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
