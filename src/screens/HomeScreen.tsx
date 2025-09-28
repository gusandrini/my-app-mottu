import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme, toggleTheme, isDark } = useTheme();

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
    {
      id: "1",
      titulo: "Selecionar Pátio",
      icone: "business",
      rota: "PatioSelection",
    },
    { id: "2", titulo: "Localizar Moto", icone: "search", rota: "LocateMoto" },
    {
      id: "3",
      titulo: isDark ? "Tema Claro" : "Tema Escuro",
      icone: isDark ? "sunny" : "moon",
      rota: "ToggleTheme",
    },
    { id: "4", titulo: "Sair", icone: "log-out", rota: "Logout" },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.primary },
      ]}
      onPress={() => {
        if (item.rota === "Logout") {
          handleLogout();
        } else if (item.rota === "ToggleTheme") {
          toggleTheme();
        } else {
          navigation.navigate(item.rota);
        }
      }}
    >
      <Ionicons name={item.icone as any} size={32} color={theme.primary} />
      <Text style={[styles.cardText, { color: theme.text }]}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
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
          ListEmptyComponent={
            <Text style={{ color: theme.text, textAlign: "center" }}>
              Nenhuma opção disponível
            </Text>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  grid: { paddingBottom: 20 },
  card: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    minHeight: 130,
  },
  cardText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
