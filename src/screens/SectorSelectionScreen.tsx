import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "@/components/Header";

const SectorSelectionScreen = () => {
  const handleSelectSector = (sector: string) => {
    // TODO: conectar com backend para listar motos desse setor
    Alert.alert("Setor selecionado", `Você escolheu: ${sector}`);
    console.log("Setor selecionado:", sector);
  };

  return (
    <View style={styles.container}>
      <Header title="Selecione o Setor" />

      <Text style={styles.subtitle}>Escolha o setor do pátio:</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectSector("Manutenção")}
      >
        <Text style={styles.buttonText}>Manutenção</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectSector("Pendência")}
      >
        <Text style={styles.buttonText}>Pendência</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectSector("Pronta para aluguel")}
      >
        <Text style={styles.buttonText}>Pronta para aluguel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectorSelectionScreen;

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
