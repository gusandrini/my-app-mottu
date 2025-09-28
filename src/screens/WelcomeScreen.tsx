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
import { Ionicons } from "@expo/vector-icons";

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

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
      const response = await api.post("/autenticacao/login", { username, senha });

      
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
       
        <Text style={[styles.title, { color: theme.primary }]}>Bem-vindo(a) </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Acesse sua conta para continuar
        </Text>

     
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.primary },
          ]}
        >
          <Ionicons name="person-outline" size={20} color={theme.primary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Usuário"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.primary },
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color={theme.primary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Ionicons name="log-in-outline" size={20} color={theme.buttonText} />
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            {loading ? "Conectando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        
        <Text style={[styles.footerText, { color: theme.text }]}>
          🔒 Seus dados estão seguros no sistema Mottu
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 30,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 16 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    gap: 8,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  footerText: {
    marginTop: 30,
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
  },
});
