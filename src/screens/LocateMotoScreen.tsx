import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";

const LocateMotoScreen = () => {
  const [plate, setPlate] = useState("");
  const { theme } = useTheme();

  const handleSearch = () => {
    if (!plate) {
      Alert.alert("Atenção", "Digite a placa da moto.");
      return;
    }
    // TODO: integrar backend
    Alert.alert("Busca realizada", `Placa digitada: ${plate}`);
    console.log("Placa buscada:", plate);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Localizar Moto" />

      <Text style={[styles.subtitle, { color: theme.text }]}>
        Digite a placa da moto:
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.primary }]}
        placeholder="Ex: ABC1234"
        placeholderTextColor="#888"
        value={plate}
        onChangeText={setPlate}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSearch}>
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocateMotoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 20 },
  button: { paddingVertical: 15, borderRadius: 8 },
  buttonText: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
