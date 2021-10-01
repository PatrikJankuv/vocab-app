import * as React from "react";
import { Pressable, StyleSheet, Text, Button, View } from "react-native";
import * as Color from "./../../utils/Colors";

export function Primary_Button({ title, navigation, screen }) {
  React.useEffect(() => {}, []);

  return (
    <Pressable
      style={[styles.button, styles.color_primary]}
      onPress={() => navigation.navigate(screen)}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export function Save_Button({ title, navigation, screen }) {
  React.useEffect(() => {}, []);

  return (
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate(screen)}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 20,
  },
  color_primary: {
    backgroundColor: Color.color_primary,
  },
  color_green: {
    backgroundColor: Color.color_primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
