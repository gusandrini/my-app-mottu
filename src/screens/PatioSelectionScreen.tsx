import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
        const data = await getSetores();
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
            Carregando setores...
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Selecione o Pátio" />

        
        <View style={styles.headerBox}>
          <Text style={[styles.title, { color: theme.text }]}>
            Escolha a Localização
          </Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Selecione abaixo o pátio para consultar motos disponíveis.
          </Text>
        </View>

       
        {patios.map((setor) => (
          <TouchableOpacity
            key={setor.id}
            style={[
              styles.button,
              { backgroundColor: theme.primary, shadowColor: theme.primary },
            ]}
            onPress={() =>
              navigation.navigate("PatioOptions", { patio: setor })
            }
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              {setor.nome}
            </Text>
          </TouchableOpacity>
        ))}

        {patios.length === 0 && (
          <Text
            style={{
              color: theme.text,
              textAlign: "center",
              marginTop: 20,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Nenhum pátio disponível no momento.
          </Text>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default PatioSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  headerBox: { alignItems: "center", marginBottom: 25 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  subtitle: { fontSize: 15, marginTop: 6, textAlign: "center" },

  button: {
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
