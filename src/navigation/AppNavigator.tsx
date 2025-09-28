import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

import WelcomeScreen from "@/screens/WelcomeScreen";
import HomeScreen from "@/screens/HomeScreen";
import PatioSelectionScreen from "@/screens/PatioSelectionScreen";
import PatioOptionsScreen from "@/screens/PatioOptionsScreen";
import SectorSelectionScreen from "@/screens/SectorSelectionScreen";
import LocateMotoScreen from "@/screens/LocateMotoScreen";
import MotoWithoutPlateScreen from "@/screens/MotoWithoutPlateScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<"Welcome" | "Home">("Welcome");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setInitialRoute("Home"); // ✅ se tem token, vai para Home
        } else {
          setInitialRoute("Welcome");
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error);
        setInitialRoute("Welcome");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00A651" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PatioSelection" component={PatioSelectionScreen} />
        <Stack.Screen name="PatioOptions" component={PatioOptionsScreen} />
        <Stack.Screen name="SectorSelection" component={SectorSelectionScreen} />
        <Stack.Screen name="LocateMoto" component={LocateMotoScreen} />
        <Stack.Screen name="MotoWithoutPlate" component={MotoWithoutPlateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
