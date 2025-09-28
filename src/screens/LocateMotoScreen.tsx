import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "@/components/Header";

const LocateMotoScreen = () => {
  const [plate, setPlate] = useState("");

  const handleSearch = () => {
    if (!plate) {
      Alert.alert("Atenção", "Digite a placa da moto.");
      return;
    }
    // TODO: integrar com backend para buscar moto pela placa
    Alert.alert("Busca realizada", `Placa digitada: ${plate}`);
    console.log("Placa buscada:", plate);
  };

  return (
    <View style={styles.container}>
      <Header title="Localizar Moto" />

      <Text style={styles.subtitle}>Digite a placa da moto:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: ABC1234"
        value={plate}
        onChangeText={setPlate}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocateMotoScreen;

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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#26548b",
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
