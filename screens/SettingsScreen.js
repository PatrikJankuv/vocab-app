import * as React from "react";
import { Text, View } from "react-native";
import { color_screen } from "../util/Colors";

export function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color_screen,
      }}
    >
      <Text>Settings</Text>
    </View>
  );
}
