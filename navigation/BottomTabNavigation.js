import * as React from "react";
import { StyleSheet } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { ExplorerScreen } from "../screens/ExplorerScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";
import { color_grey, color_primary, color_screen } from "../utils/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const HomeTab = createMaterialTopTabNavigator();
function HomeTabScreen() {
  return (
    <HomeTab.Navigator
      tabBarOptions={{
        activeTintColor: color_primary,
        inactiveTintColor: color_grey,
        indicatorStyle: {
          backgroundColor: color_primary,
        },
      }}
    >
      <HomeTab.Screen name="Explored" component={HomeScreen} />
      <HomeTab.Screen name="Favorite" component={FavoriteScreen} />
    </HomeTab.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeTabScreen} />
    </HomeStack.Navigator>
  );
}

const ExplorerStack = createStackNavigator();
function ExplorerStackScreen() {
  return (
    <ExplorerStack.Navigator>
      <ExplorerStack.Screen name="Explorer" component={ExplorerScreen} />
    </ExplorerStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-book" : "ios-book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Explorer") {
            iconName = focused ? "rocket" : "rocket-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: color_primary,
        inactiveTintColor: color_grey,
        // showLabel: false,
        style: styles.tab,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Explorer" component={ExplorerStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: 60,
    borderColor: color_grey,
  },
});
