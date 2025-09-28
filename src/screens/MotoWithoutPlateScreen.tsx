import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const MotoWithoutPlateScreen = () => {
  const [triatag, setTriatag] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleSearch = () => {
    if (!triatag) {
      setMensagem("⚠️ Digite o código da TRIATAG para continuar.");
      return;
    }

    // ✅ Apenas feedback genérico (sem backend)
    setMensagem(`🔍 Busca realizada para o código: ${triatag}\nNenhuma moto encontrada.`);
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Moto sem Placa" />

        <Text style={[styles.subtitle, { color: theme.text }]}>
          Digite o código da TRIATAG:
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.primary,
            },
          ]}
          placeholder="Ex: TRI123456"
          placeholderTextColor="#888"
          value={triatag}
          onChangeText={setTriatag}
          autoCapitalize="characters"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSearch}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Buscar
          </Text>
        </TouchableOpacity>

        {mensagem && (
          <Text style={[styles.resultado, { color: theme.text }]}>{mensagem}</Text>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default MotoWithoutPlateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  resultado: { marginTop: 20, fontSize: 16, textAlign: "center" },
});
