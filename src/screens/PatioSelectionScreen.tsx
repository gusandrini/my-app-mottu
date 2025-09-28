import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";

const PatioSelectionScreen = () => {
  const navigation = useNavigation<any>();

  const patios = ["Pátio Central", "Pátio Zona Norte", "Pátio Zona Sul"];

  return (
    <View style={styles.container}>
      <Header title="Selecione o Pátio" />

      <Text style={styles.subtitle}>Escolha a localização:</Text>

      {patios.map((patio, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate("PatioOptions", { patio })}
        >
          <Text style={styles.buttonText}>{patio}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PatioSelectionScreen;

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
