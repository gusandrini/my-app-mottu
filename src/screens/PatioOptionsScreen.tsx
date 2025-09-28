import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";

const PatioOptionsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { patio } = route.params || { patio: "Pátio não selecionado" };
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Opções do Pátio" />

      <Text style={[styles.subtitle, { color: theme.text }]}>
        Pátio selecionado: {patio}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("SectorSelection")}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Ver motos do pátio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("LocateMoto")}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Localizar moto pela placa
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("MotoWithoutPlate")}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Buscar moto sem placa (TRIATAG)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatioOptionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  button: { paddingVertical: 15, borderRadius: 8, marginBottom: 15 },
  buttonText: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
