import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const PatioSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const patios = ["Pátio Central", "Pátio Zona Norte", "Pátio Zona Sul"];

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Selecione o Pátio" />

        <Text style={[styles.subtitle, { color: theme.text }]}>
          Escolha a localização:
        </Text>

        {patios.map((patio, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate("PatioOptions", { patio })}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              {patio}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default PatioSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  button: { paddingVertical: 15, borderRadius: 8, marginBottom: 15 },
  buttonText: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
