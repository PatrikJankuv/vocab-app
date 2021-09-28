import * as React from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Primary_Button } from "./Components/Button";
import * as Colors from "./../utils/Colors.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { openConnection, getTopNUnexploredWords } from "./../Database";

db = openConnection();

function DefaulSubScreen({ navigation }) {
  const [fill_percentage, setFill] = React.useState(65);

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
        fill={fill_percentage}
        tintColor={Colors.color_primary}
        backgroundColor="#3d5875"
        arcSweepAngle={180}
        rotation="270"
        lineCap="round"
      >
        {(fill) => (
          <>
            <Text style={{ fontSize: 80 }}>{fill * 10} </Text>
            <Text>out of 1000 words</Text>
          </>
        )}
      </AnimatedCircularProgress>

      <Primary_Button
        title={"Explore"}
        navigation={navigation}
        screen={"Details"}
      ></Primary_Button>
    </View>
  );
}

//exploring new words
function NewWordsSubScreen({ navigation }) {
  const [_array, set_array] = React.useState([]);
  const [temp, set_temp] = React.useState("slovo");
  const [translate, set_translate] = React.useState();

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getTopNUnexploredWords(db, set_array, 10);
    // set_temp(_array[0]);
    console.log(_array);
    console.log(temp);
  };

  return (
    <ScrollView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Explore Screen</Text>
      <Text style={styles.word}>{temp}</Text>

      <TextInput
        style={styles.input}
        onChangeText={set_translate}
        value={translate}
        placeholder={"Translation"}
      />

      {/* <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Domov")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      /> */}
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

export function ExplorerScreen() {
  const [fill, setFill] = React.useState(40);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="domov" component={DefaulSubScreen} />
      <Stack.Screen name="Details" component={NewWordsSubScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  input: {
    // height: 50,
    margin: 10,
    borderBottomWidth: 1,
    padding: 10,
    width: 200,
    fontSize: 18,
  },
  word: {
    fontSize: 27,
  },
});
