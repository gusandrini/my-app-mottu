import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      Alert.alert("Sessão encerrada", "Você saiu do aplicativo.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  const opcoes = [
    { id: "1", titulo: "Selecionar Pátio", icone: "business", rota: "PatioSelection" },
    { id: "2", titulo: "Localizar Moto", icone: "search", rota: "LocateMoto" },
    { id: "3", titulo: "Gerenciar Motos", icone: "bicycle", rota: "MotoList" },
    { id: "4", titulo: "Gerenciar Setores", icone: "grid", rota: "SetorList" },
    { id: "5", titulo: "Meu Perfil", icone: "person", rota: "Perfil" },
    { id: "6", titulo: "Sair", icone: "log-out", rota: "Logout" },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.primary }]}
      onPress={() => (item.rota === "Logout" ? handleLogout() : navigation.navigate(item.rota))}
    >
      <Ionicons name={item.icone as any} size={32} color={theme.primary} />
      <Text style={[styles.cardText, { color: theme.text }]}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Página Inicial" />

        <Text style={[styles.title, { color: theme.text }]}>
          Bem-vindo ao Sistema Mottu 🚀
        </Text>

        <FlatList
          data={opcoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.grid}
        />
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  grid: { paddingBottom: 20 },
  card: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    minHeight: 120,
  },
  cardText: { marginTop: 10, fontSize: 14, fontWeight: "bold", textAlign: "center" },
});
