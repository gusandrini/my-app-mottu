import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";
import { useTheme } from "@/context/ThemeContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔑 LOGIN
  const handleLogin = async () => {
    if (!username || !senha) {
      Alert.alert("Erro", "Preencha usuário e senha");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/autenticacao/login", { username, senha });

      // ⚠️ Backend deve retornar { token, id, username }
      const { token, id } = response.data;

      await AsyncStorage.setItem("token", token);
      if (id) {
        await AsyncStorage.setItem("userId", id.toString());
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", "Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.primary }]}>Bem-vindo(a) Mottu</Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.primary,
            },
          ]}
          placeholder="Usuário"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.primary,
            },
          ]}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            {loading ? "Conectando..." : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
