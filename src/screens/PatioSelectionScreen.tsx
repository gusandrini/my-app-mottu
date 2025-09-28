import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { getSetores } from "@/api/setor";

const PatioSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const [patios, setPatios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await getSetores(); // chama backend
        setPatios(data);
      } catch (err) {
        console.error("Erro ao carregar setores:", err);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={[styles.container, { backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={{ marginTop: 10, color: theme.text }}>Carregando setores...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Selecione o Pátio" />

        <Text style={[styles.subtitle, { color: theme.text }]}>
          Escolha a localização:
        </Text>

        {patios.map((setor) => (
          <TouchableOpacity
            key={setor.id}
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate("PatioOptions", { patio: setor })}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              {setor.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default PatioSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  button: { paddingVertical: 15, borderRadius: 8, marginBottom: 15 },
  buttonText: { fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
