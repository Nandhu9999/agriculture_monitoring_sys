import { Stack } from "expo-router";
import { Image, Text, View, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useUserStore } from "../src/store";

function LogoTitle({}: any) {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../assets/icon.png")}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#999" }}>
        Agriculture Monitoring System
      </Text>
    </View>
  );
}

export default function RootLayout() {
  // const { width } = useWindowDimensions();
  // console.log("root layout", width);

  const user = useUserStore((state) => state.user);
  console.log("ROOT LAYOUT", user);

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      // initialRouteName={Platform.OS === "web" ? "index" : "login"}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerLeft: () => <View />,
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      {!user?.uid ? (
        <Stack.Screen name="login" />
      ) : (
        <Stack.Screen name="(drawer)" />
      )}
    </Stack>
  );
}
