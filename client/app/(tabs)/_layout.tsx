import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: "rgb(56, 149, 131)",
        // tabBarInactiveBackgroundColor: "#323232",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          headerRight: () => (
            <Ionicons
              name="exit-outline"
              size={28}
              style={{ marginRight: 10 }}
              onPress={() => router.push("/")}
            />
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          headerTitle: "Services",
          href: "/services",
          headerLeft: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "leaf" : "leaf-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          headerTitle: "Capture",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "md-camera" : "md-camera-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
