import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { View, useWindowDimensions } from "react-native";

import { Redirect } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "../../src/store";

const queryClient = new QueryClient();

const drawerItemMargin = -16;
const drawerWidth = [62, 240]; // minimum and maximum range
export default function DrawerLayout() {
  const { width } = useWindowDimensions();

  const user = useUserStore((state) => state.user);
  console.log(user);
  if (!user?.uid) {
    return <Redirect href="/login" />;
  }
  console.log(user);

  return (
    <QueryClientProvider client={queryClient}>
      <Drawer
        initialRouteName="home"
        screenOptions={{
          drawerType: "permanent",
          drawerPosition: "left",
          drawerActiveTintColor: "#36973d",
          headerLeft: (props) => {
            return <View></View>;
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
        {/* {user?.guest === false && ( */}
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
        {/* )} */}
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

        {/* {user?.guest === false && ( */}
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
        {/* )} */}

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
    </QueryClientProvider>
  );
}
