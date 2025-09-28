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

    setMensagem(`🔍 Busca realizada para o código: ${triatag}\nNenhuma moto encontrada.`);
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Moto sem Placa" />

      
        <View style={styles.headerBox}>
          <Text style={[styles.title, { color: theme.text }]}>
            Consulta via TRIATAG
          </Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Informe o código da etiqueta (TRIATAG) para buscar a moto
          </Text>
        </View>

        
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.primary },
          ]}
        >
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Ex: TRI123456"
            placeholderTextColor="#888"
            value={triatag}
            onChangeText={setTriatag}
            autoCapitalize="characters"
          />
        </View>

        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSearch}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Buscar Moto
          </Text>
        </TouchableOpacity>


        {mensagem && (
          <View
            style={[
              styles.resultBox,
              { borderColor: theme.primary, backgroundColor: theme.card },
            ]}
          >
            <Text style={[styles.resultado, { color: theme.text }]}>
              {mensagem}
            </Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default MotoWithoutPlateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  headerBox: { alignItems: "center", marginBottom: 25 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  subtitle: { fontSize: 15, marginTop: 6, textAlign: "center" },

  inputBox: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    elevation: 2,
  },
  input: { paddingVertical: 12, fontSize: 16 },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },

  resultBox: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  resultado: { fontSize: 16, fontWeight: "600", textAlign: "center" },
});
