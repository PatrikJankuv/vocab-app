import * as React from "react";
import { Text, View, TextInput, StyleSheet, Image, Button } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Primary_Button } from "./Components/Button";
import * as ColorsUtils from "./../utils/Colors.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { openConnection, getTopNUnexploredWords } from "./../Database";
import { ProgressBar, Colors } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FavoriteIconStar } from "./Components/FavoritIconStar";

db = openConnection();

function DefaulSubScreen({ navigation }) {
  const [fill_percentage, setFill] = React.useState(65);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorsUtils.color_screen,
      }}
    >
      <Text>Explored </Text>
      <AnimatedCircularProgress
        size={250}
        width={20}
        backgroundWidth={4}
        fill={fill_percentage}
        tintColor={ColorsUtils.color_primary}
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
  const [temp, set_temp] = React.useState({
    explored: 0,
    favorite: 0,
    hint: "null",
    id: 0,
    rank: 0,
    translate: null,
    translate_hint: null,
    word: "null",
  });
  const [translate, set_translate] = React.useState();
  const [hint, set_hint] = React.useState(false);
  const [loaded, set_loaded] = React.useState(false);

  React.useEffect(() => {
    console.log(temp);

    loadData().then(set_temp(_array[0]));
    if (temp != null) {
      set_loaded(true);
    }

    console.log("chcem nastavit ");
    console.log(_array[0]);
  }, []);

  const loadData = async () => {
    getTopNUnexploredWords(db, set_array, 10);

    // console.log("temp");
    // console.log(temp);
  };

  return (
    <>
      {loaded ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              // alignItems: "center",
            }}
          >
            <ProgressBar
              style={styles.progress}
              progress={0.4}
              color={ColorsUtils.color_green}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {/* {hint ? } */}
                <Ionicons
                  name={"ios-chevron-back-circle-sharp"}
                  size={50}
                  color={ColorsUtils.color_primary}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "flex-end", marginRight: 20 }}>
              <TouchableOpacity onPress={() => set_hint(!hint)}>
                {hint ? (
                  <Ionicons
                    name={"ios-bulb-outline"}
                    size={50}
                    color={ColorsUtils.color_primary}
                  />
                ) : (
                  <Ionicons
                    name={"ios-bulb"}
                    size={50}
                    color={ColorsUtils.color_primary}
                  />
                )}
              </TouchableOpacity>
              {/* <FavoriteIconStar
            size={25}
            favorite_prop={_array[0].favorite}
            id={_array[0].id}
            db={db}
          /> */}
            </View>
          </View>
          <View
            style={{
              flex: 20,
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Text>Explore Screen</Text>
            <Text>{hint && <>Hint: {temp && temp.hint}</>}</Text>
            <Image
              style={styles.flag}
              source={require("./../assets/src/flags/italy.png")}
            ></Image>
            {console.log(temp)}
            <Text style={styles.word}>{temp && temp.word}</Text>

            <TextInput
              style={styles.input}
              onChangeText={set_translate}
              value={translate}
              placeholder={"Translation"}
            />
            <Primary_Button
              title={"Save"}
              navigation={navigation}
              screen={"Details"}
            ></Primary_Button>
          </View>
        </View>
      ) : (
        <Text>noll</Text>
      )}
    </>
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
  flag: {
    width: 64,
    height: 64,
  },
  progress: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});
