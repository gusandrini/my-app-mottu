import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";

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

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Página Inicial" />

        <Text style={[styles.title, { color: theme.text }]}>
          Bem-vindo ao Sistema Mottu
        </Text>

        {/* Botão Selecionar Pátio */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("PatioSelection")}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Selecionar Pátio
          </Text>
        </TouchableOpacity>

        {/* Botão Logout */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.secondary }]}
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  button: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
