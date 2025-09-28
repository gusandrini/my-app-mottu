import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const SectorSelectionScreen = () => {
  const { theme } = useTheme();

  const handleSelectSector = (sector: string) => {
    Alert.alert(
      "Atenção",
      `Não há motos disponíveis no setor ${sector}. 🚫`
    );
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Selecione o Setor" />

        <Text style={[styles.subtitle, { color: theme.text }]}>
          Escolha o setor do pátio:
        </Text>

        {["Manutenção", "Pendência", "Pronta para aluguel"].map((sector) => (
          <TouchableOpacity
            key={sector}
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => handleSelectSector(sector)}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              {sector}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default SectorSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  button: { paddingVertical: 15, borderRadius: 8, marginBottom: 15 },
  buttonText: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
