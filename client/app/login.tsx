import { useContext } from "react";
import LoginScreen from "../src/screens/LoginScreen";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import UserContext from "../src/contexts/UserContext";
import { Redirect } from "expo-router";

export default function LoginPage() {
  const { user }: any = useContext(UserContext);
  if (Object.keys(user).length !== 0) {
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
