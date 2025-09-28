import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";

const MotoWithoutPlateScreen = () => {
  const [triatag, setTriatag] = useState("");
  const { theme } = useTheme();

  const handleSearch = () => {
    if (!triatag) {
      Alert.alert("Atenção", "Digite o código da TRIATAG.");
      return;
    }
    // TODO: integrar backend
    Alert.alert("Busca realizada", `Código digitado: ${triatag}`);
    console.log("TRIATAG buscada:", triatag);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Moto sem Placa" />

      <Text style={[styles.subtitle, { color: theme.text }]}>
        Digite o código da TRIATAG:
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.primary }]}
        placeholder="Ex: TRI123456"
        placeholderTextColor="#888"
        value={triatag}
        onChangeText={setTriatag}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSearch}>
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MotoWithoutPlateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 20 },
  button: { paddingVertical: 15, borderRadius: 8 },
  buttonText: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
