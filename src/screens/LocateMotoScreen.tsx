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
import { Ionicons } from "@expo/vector-icons";
import { getMotos } from "@/api/moto"; 

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


        <View style={styles.headerBox}>
          <Text style={[styles.title, { color: theme.text }]}>
            Buscar Moto pela Placa
          </Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Digite a placa completa da moto para consultar.
          </Text>
        </View>


        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.primary },
          ]}
        >
          <Ionicons
            name="search"
            size={22}
            color={theme.primary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Ex: ABC1234"
            placeholderTextColor="#888"
            value={plate}
            onChangeText={setPlate}
            autoCapitalize="characters"
          />
        </View>


        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSearch}
        >
          <Ionicons name="search-outline" size={20} color={theme.buttonText} />
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Buscar Moto
          </Text>
        </TouchableOpacity>


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
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, { color: theme.primary }]}>
                  {item.placa}
                </Text>
                <Text style={{ color: theme.text, fontSize: 15 }}>
                  Modelo: {item.modelo}
                </Text>
                <Text style={{ color: theme.text, fontSize: 15 }}>
                  Ano: {item.ano}
                </Text>
                <Text style={{ color: theme.text, fontSize: 15 }}>
                  Setor: {item.setor ? item.setor.nome : "Sem setor"}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            plate !== "" && resultados.length === 0 ? (
              <View style={styles.emptyBox}>
                <Ionicons name="alert-circle" size={32} color={theme.primary} />
                <Text style={[styles.emptyText, { color: theme.text }]}>
                  Nenhuma moto encontrada.
                </Text>
              </View>
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
  container: { flex: 1, padding: 20 },
  headerBox: { alignItems: "center", marginBottom: 25 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  subtitle: { fontSize: 15, marginTop: 6, textAlign: "center" },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    elevation: 2,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 10, fontSize: 16 },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    gap: 8,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },

  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },

  emptyBox: { alignItems: "center", marginTop: 30 },
  emptyText: { fontSize: 16, fontWeight: "600", marginTop: 10 },
});
