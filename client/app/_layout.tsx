import { Stack } from "expo-router";
import { Image, Platform, Text, View, useWindowDimensions } from "react-native";
import UserContext from "../src/contexts/UserContext";
import { useState } from "react";

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

  const [user, setUser] = useState({});
  const contextProviderValues: any = { user: user || {}, setUser: setUser };
  console.log("ROOT LAYOUT", user);

  return (
    <UserContext.Provider value={contextProviderValues}>
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
        {Object.keys(user || {}).length == 0 ? (
          <Stack.Screen name="login" />
        ) : (
          <Stack.Screen name="(drawer)" />
        )}
      </Stack>
    </UserContext.Provider>
  );
}
