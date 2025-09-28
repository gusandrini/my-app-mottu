import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { getMotos } from "@/api/moto"; // função GET /motos

const LocateMotoScreen = () => {
  const [plate, setPlate] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const { theme } = useTheme();

  const handleSearch = async () => {
    if (!plate) {
      Alert.alert("Atenção", "Digite a placa da moto.");
      return;
    }

    try {
      const motos = await getMotos();
      const encontradas = motos.filter(
        (m: any) => m.placa.toUpperCase() === plate.toUpperCase()
      );

      setResultados(encontradas);
      if (encontradas.length === 0) {
        Alert.alert("Não encontrada", "Nenhuma moto com essa placa.");
      }
    } catch (err) {
      console.error("Erro ao buscar moto:", err);
      Alert.alert("Erro", "Não foi possível buscar a moto.");
    }
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Localizar Moto" />

        <Text style={[styles.subtitle, { color: theme.text }]}>
          Digite a placa da moto:
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
          placeholder="Ex: ABC1234"
          placeholderTextColor="#888"
          value={plate}
          onChangeText={setPlate}
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

        {/* Lista de resultados */}
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.primary },
              ]}
            >
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {item.modelo} - {item.placa}
              </Text>
              <Text style={{ color: theme.text }}>Ano: {item.ano}</Text>
              <Text style={{ color: theme.text }}>
                Setor: {item.setor ? item.setor.nome : "Sem setor"}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            resultados.length === 0 && plate !== "" ? (
              <Text style={[styles.emptyText, { color: theme.text }]}>
                Nenhuma moto encontrada.
              </Text>
            ) : null
          }
          style={{ marginTop: 20 }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default LocateMotoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: { paddingVertical: 15, borderRadius: 8 },
  buttonText: { fontSize: 16, textAlign: "center", fontWeight: "bold" },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16 },
});
