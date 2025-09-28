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
import { useRoute } from "@react-navigation/native";
import Header from "@/components/Header";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { getSetorById } from "@/api/setor";

const filtrosMap = {
  E: "MOTTU_E",
  SPORT: "MOTTU_SPORT",
  POP: "MOTTU_POP",
};

const PatioOptionsScreen = () => {
  const route = useRoute<any>();
  const { theme } = useTheme();

  const setorSelecionado = route.params?.patio;
  const [setor, setSetor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<string | null>(null);
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

  
  useEffect(() => {
    if (!setor) return;

    let filtradas = setor.motos || [];

    if (search) {
      filtradas = filtradas.filter(
        (m: any) =>
          m.modelo.toLowerCase().includes(search.toLowerCase()) ||
          m.placa.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filtro) {
      filtradas = filtradas.filter((m: any) => m.modelo === filtro);
    }

    setMotosFiltradas(filtradas);
  }, [search, filtro, setor]);

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
        <Header title={`Pátio - ${setor?.nome}`} />

      
        <View style={styles.headerBox}>
          <Text style={[styles.title, { color: theme.text }]}>
            Motos disponíveis neste setor
          </Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Pesquise por modelo, placa ou selecione uma categoria.
          </Text>
        </View>

     
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.primary,
            },
          ]}
          placeholder="Pesquisar por modelo ou placa..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />

        
        <View style={styles.filtrosBox}>
          {Object.entries(filtrosMap).map(([label, value]) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.filtroButton,
                {
                  backgroundColor:
                    filtro === value ? theme.primary : theme.card,
                  borderColor: theme.primary,
                },
              ]}
              onPress={() =>
                setFiltro(filtro === value ? null : (value as string))
              }
            >
              <Text
                style={{
                  color: filtro === value ? theme.buttonText : theme.text,
                  fontWeight: "600",
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        
        <FlatList
          data={motosFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.primary },
              ]}
              activeOpacity={0.8}
            >
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                {item.placa}
              </Text>
              <Text style={{ color: theme.text, fontSize: 15 }}>
                Modelo: {item.modelo.replace("MOTTU_", "")}
              </Text>
              <Text style={{ color: theme.text, fontSize: 15 }}>
                Ano: {item.ano}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={[styles.emptyText, { color: theme.text }]}>
                Nenhuma moto encontrada com os filtros selecionados.
              </Text>
            </View>
          }
          style={{ marginTop: 10 }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default PatioOptionsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  headerBox: { alignItems: "center", marginBottom: 25 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  subtitle: { fontSize: 15, marginTop: 6, textAlign: "center" },

  input: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },

  filtrosBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filtroButton: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  card: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },

  emptyBox: { alignItems: "center", marginTop: 30 },
  emptyText: { fontSize: 16, fontWeight: "600" },
});
