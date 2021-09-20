import * as React from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Primary_Button } from "./Components/Button";
import * as Colors from "./../utils/Colors.js";

export function ExplorerScreen() {
  const [fill, setFill] = React.useState(40);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.color_screen,
      }}
    >
      <Text>Explored </Text>
      <AnimatedCircularProgress
        size={250}
        width={20}
        backgroundWidth={4}
        fill={fill}
        tintColor={Colors.color_primary}
        backgroundColor="#3d5875"
        arcSweepAngle="180"
        rotation="270"
        lineCap="round"
      >
        {(fill) => (
          <>
            <Text style={{ fontSize: 80 }}>{fill} </Text>
            <Text>out of 1000 words</Text>
          </>
        )}
      </AnimatedCircularProgress>

      <Primary_Button title={"Explore"}></Primary_Button>
    </View>
  );
}
