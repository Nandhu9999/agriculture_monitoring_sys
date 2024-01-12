import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { View, useWindowDimensions } from "react-native";

import UserContext from "../../src/contexts/UserContext";
import { useContext } from "react";
import { Redirect } from "expo-router";

const drawerItemMargin = -16;
const drawerWidth = [62, 240]; // minimum and maximum range
export default function DrawerLayout() {
  const { width } = useWindowDimensions();

  const { user }: any = useContext(UserContext);
  if (Object.keys(user).length === 0) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      initialRouteName="home"
      screenOptions={{
        drawerType: "permanent",
        drawerPosition: "left",
        drawerActiveTintColor: "#36973d",
        headerLeft: (props) => {
          return null;
        },
        drawerStyle: {
          width: width < 600 ? drawerWidth[0] : drawerWidth[1],
          paddingTop: 60,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ color, size, focused }) => (
            <View style={{ marginRight: drawerItemMargin }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="services"
        options={{
          drawerLabel: "Services",
          title: "Services",
          headerShown: false,
          drawerIcon: ({ color, size, focused }) => (
            <View style={{ marginRight: drawerItemMargin }}>
              <Ionicons
                name={focused ? "leaf" : "leaf-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="capture"
        options={{
          drawerLabel: "Capture",
          title: "Capture",
          drawerIcon: ({ color, size, focused }) => (
            <View style={{ marginRight: drawerItemMargin }}>
              <Ionicons
                name={focused ? "md-camera" : "md-camera-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="simulator"
        options={{
          drawerLabel: "Simulator",
          title: "Simulator",
          drawerIcon: ({ color, size, focused }) => (
            <View style={{ marginRight: drawerItemMargin }}>
              <Ionicons
                name={focused ? "aperture" : "aperture-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color, size, focused }) => (
            <View style={{ marginRight: drawerItemMargin }}>
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Drawer>
  );
}
