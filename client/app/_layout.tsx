import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";

export default function RootLayout() {
  const { width } = useWindowDimensions();
  console.log("root layout", width);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      {/* {width < 600 ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : ( */}
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      {/* )} */}
    </Stack>
  );
}
