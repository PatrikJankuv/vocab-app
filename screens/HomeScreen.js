import * as React from "react";
import { View } from "react-native";
import { openConnection } from "./../Database";
import { WordsFlatList } from "./Components/WordsFlatList";
import { color_screen } from "../util/Colors";

const db = openConnection();

export function HomeScreen() {
  return (
    // <View style={{ backgroundColor: color_screen }}>
    <WordsFlatList database={db}></WordsFlatList>
    // </View>
  );
}
