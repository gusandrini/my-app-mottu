import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "@/screens/WelcomeScreen";
import PatioSelectionScreen from "@/screens/PatioSelectionScreen";
import PatioOptionsScreen from "@/screens/PatioOptionsScreen";
import SectorSelectionScreen from "@/screens/SectorSelectionScreen";
import LocateMotoScreen from "@/screens/LocateMotoScreen";
import MotoWithoutPlateScreen from "@/screens/MotoWithoutPlateScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
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
