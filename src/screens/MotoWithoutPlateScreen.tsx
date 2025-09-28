import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "@/components/Header";

const MotoWithoutPlateScreen = () => {
  const [triatag, setTriatag] = useState("");

  const handleSearch = () => {
    if (!triatag) {
      Alert.alert("Atenção", "Digite o código da TRIATAG.");
      return;
    }
    // TODO: integrar com backend para buscar moto pela TRIATAG
    Alert.alert("Busca realizada", `Código digitado: ${triatag}`);
    console.log("TRIATAG buscada:", triatag);
  };

  return (
    <View style={styles.container}>
      <Header title="Moto sem Placa" />

      <Text style={styles.subtitle}>Digite o código da TRIATAG:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: TRI123456"
        value={triatag}
        onChangeText={setTriatag}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MotoWithoutPlateScreen;

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
