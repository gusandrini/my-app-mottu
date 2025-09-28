import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { getSetorById } from "@/api/setor";

const PatioOptionsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const setorSelecionado = route.params?.patio;
  const [setor, setSetor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [motosFiltradas, setMotosFiltradas] = useState<any[]>([]);

  useEffect(() => {
    const carregarSetor = async () => {
      try {
        const data = await getSetorById(setorSelecionado.id);
        setSetor(data);
        setMotosFiltradas(data.motos || []);
      } catch (err) {
        console.error("Erro ao carregar setor:", err);
      } finally {
        setLoading(false);
      }
    };

    if (setorSelecionado?.id) carregarSetor();
  }, [setorSelecionado]);

  // Atualiza lista quando o usuário digita
  useEffect(() => {
    if (!setor) return;

    const filtradas = (setor.motos || []).filter(
      (m: any) =>
        m.modelo.toLowerCase().includes(search.toLowerCase()) ||
        m.placa.toLowerCase().includes(search.toLowerCase())
    );

    setMotosFiltradas(filtradas);
  }, [search, setor]);

  if (loading) {
    return (
      <ScreenWrapper>
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.background,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={{ marginTop: 10, color: theme.text }}>
            Carregando motos...
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  if (!setor) {
    return (
      <ScreenWrapper>
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.background,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ color: theme.text }}>Nenhum setor encontrado.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title={`Opções - ${setor.nome}`} />

        <Text style={[styles.subtitle, { color: theme.text }]}>
          Motos disponíveis neste setor:
        </Text>

        {/* 🔍 Barra de pesquisa */}
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.card, color: theme.text, borderColor: theme.primary },
          ]}
          placeholder="Pesquisar por modelo ou placa..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={motosFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.card, borderColor: theme.primary }]}
            >
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {item.modelo} - {item.placa}
              </Text>
              <Text style={{ color: theme.text }}>Ano: {item.ano}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.text }]}>
              Nenhuma moto encontrada.
            </Text>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default PatioOptionsScreen;

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
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16 },
});
