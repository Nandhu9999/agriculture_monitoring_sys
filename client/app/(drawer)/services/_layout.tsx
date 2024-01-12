import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Services", headerShown: true }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Service#",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
