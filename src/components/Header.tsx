import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/context/ThemeContext";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.button, { backgroundColor: theme.secondary }]}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Voltar
        </Text>
      </TouchableOpacity>

      {title && (
        <Text style={[styles.title, { color: theme.buttonText }]}>{title}</Text>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={[styles.button, { backgroundColor: theme.secondary }]}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 4, 
    shadowColor: "#000", 
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
