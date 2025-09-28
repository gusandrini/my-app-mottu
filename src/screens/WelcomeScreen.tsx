import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";  
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme, toggleTheme, isDark } = useTheme();

  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !senha) {
      Alert.alert("Erro", "Preencha usuário e senha");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/autenticacao/login", {
        username,
        senha,
      });

      const token = response.data.token;
      await AsyncStorage.setItem("token", token);

      Alert.alert("Sucesso", "Login realizado!");
      navigation.navigate("Home");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cadastro
  const handleRegister = async () => {
    if (!username || !senha) {
      Alert.alert("Erro", "Preencha usuário e senha");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/autenticacao/cadastrar", {
        username,
        senha,
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Usuário cadastrado!");
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "Usuário já existe ou dados inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Login</Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.card, color: theme.text, borderColor: theme.primary },
          ]}
          placeholder="Usuário"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.card, color: theme.text, borderColor: theme.primary },
          ]}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {/* Botão Login */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            {loading ? "Conectando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        {/* Botão Cadastro */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.secondary }]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        {/* Botão Tema */}
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  input: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  themeButton: { padding: 10, borderWidth: 1, borderRadius: 8, marginTop: 20 },
});
