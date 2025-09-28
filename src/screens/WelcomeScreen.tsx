import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          Bem-vindo ao Sistema Mottu
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("Home")} // ✅ agora vai para Home
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Entrar
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.themeButton, { borderColor: theme.primary }]}
          onPress={toggleTheme}
        >
          <Text style={{ color: theme.text }}>
            {isDark ? "Tema Claro" : "Tema Escuro"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 40, textAlign: "center" },
  button: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8, marginBottom: 20 },
  buttonText: { fontSize: 18, fontWeight: "bold" },
  themeButton: { padding: 10, borderWidth: 1, borderRadius: 8 },
});
