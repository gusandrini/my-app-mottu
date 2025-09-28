import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useTheme } from "@/context/ThemeContext";
import { getUsuarioById } from "@/api/usuario";

const PerfilScreen = () => {
  const { theme } = useTheme();
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        // Aqui você salva o id do usuário junto com o token no AsyncStorage ao logar
        const id = await AsyncStorage.getItem("userId");

        if (!id) {
          Alert.alert("Erro", "Não foi possível identificar o usuário logado.");
          return;
        }

        const data = await getUsuarioById(Number(id));
        setUsuario(data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        Alert.alert("Erro", "Falha ao buscar informações do perfil.");
      } finally {
        setLoading(false);
      }
    };

    carregarUsuario();
  }, []);

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={{ color: theme.text, marginTop: 10 }}>Carregando perfil...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Meu Perfil" />
        {usuario ? (
          <>
            <Text style={[styles.info, { color: theme.text }]}>
              <Text style={styles.label}>Usuário: </Text>
              {usuario.username}
            </Text>
            <Text style={[styles.info, { color: theme.text }]}>
              <Text style={styles.label}>Email: </Text>
              {usuario.email}
            </Text>
          </>
        ) : (
          <Text style={{ color: theme.text }}>Nenhum dado disponível.</Text>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  info: { fontSize: 18, marginBottom: 15 },
  label: { fontWeight: "bold" },
});
