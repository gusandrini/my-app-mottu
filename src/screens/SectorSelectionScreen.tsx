import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";

const setores = [
  { nome: "Manutenção", icone: "construct-outline", cor: "#FFB300" },
  { nome: "Pendência", icone: "alert-circle-outline", cor: "#FF3B30" },
  { nome: "Pronta para aluguel", icone: "checkmark-done-outline", cor: "#34C759" },
];

const SectorSelectionScreen = () => {
  const { theme } = useTheme();

  const handleSelectSector = (sector: string) => {
    Alert.alert("Atenção", `Não há motos disponíveis no setor ${sector}. 🚫`);
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Selecione o Setor" />

       
        <View style={styles.headerBox}>
          <Text style={[styles.title, { color: theme.text }]}>Setores do Pátio</Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Escolha um dos setores para visualizar as motos disponíveis.
          </Text>
        </View>

        
        {setores.map((sector) => (
          <TouchableOpacity
            key={sector.nome}
            style={[
              styles.button,
              { backgroundColor: theme.card, borderColor: theme.primary },
            ]}
            onPress={() => handleSelectSector(sector.nome)}
          >
            <Ionicons name={sector.icone as any} size={22} color={sector.cor} />
            <Text style={[styles.buttonText, { color: theme.text }]}>
              {sector.nome}
            </Text>
          </TouchableOpacity>
        ))}

        
        <View style={styles.footerBox}>
          <Text style={[styles.footerText, { color: theme.text }]}>
            🔒 Dados de demonstração — nenhum setor possui motos vinculadas no
            momento.
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SectorSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  headerBox: { alignItems: "center", marginBottom: 25 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 15, textAlign: "center" },

  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 12,
    elevation: 2,
  },
  buttonText: { fontSize: 16, fontWeight: "600" },

  footerBox: { marginTop: 30, alignItems: "center" },
  footerText: { fontSize: 13, fontStyle: "italic", textAlign: "center" },
});
