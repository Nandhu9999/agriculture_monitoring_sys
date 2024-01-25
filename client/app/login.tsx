import LoginScreen from "../src/screens/LoginScreen";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useUserStore } from "../src/store";

export default function LoginPage() {
  const user = useUserStore((state) => state.user);

  if (user?.uid) {
    console.log("redirect");
    return <Redirect href="/" />;
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <LoginScreen />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
