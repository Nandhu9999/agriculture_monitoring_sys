import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";
import UserContext from "../src/contexts/UserContext";
import { useState } from "react";

export default function RootLayout() {
  // const { width } = useWindowDimensions();
  // console.log("root layout", width);

  const [user, setUser] = useState({});
  console.log("ROOT LAYOUT", user);
  const contextProviderValues: any = { user: user || {}, setUser: setUser };

  return (
    <UserContext.Provider value={contextProviderValues}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(drawer)" />
      </Stack>
    </UserContext.Provider>
  );
}
