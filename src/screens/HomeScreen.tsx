import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title="Página Inicial" />

        <Text style={[styles.title, { color: theme.text }]}>
          Bem-vindo à Home!
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("PatioSelection")}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Selecionar Pátio
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  button: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8 },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
