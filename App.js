import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { openConnection, initiateDatabase } from "./Database";
import { TabNavigator } from "./navigation/BottomTabNavigation";

const db = openConnection();

export default function App() {
  React.useEffect(() => {
    initiateStorage();
  }, []);

  const initiateStorage = async () => {
    const inited = await AsyncStorage.getItem("@inited");

    if (inited === null) {
      await AsyncStorage.setItem("@inited", "true");
      initiateDatabase(db);
    }
  };

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
