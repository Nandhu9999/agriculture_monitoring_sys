import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [pswd, setPswd] = useState<string>("");

  const handleLogin = () => {
    console.log(email, pswd);
  };

  const handleRegister = () => {
    console.log(email, pswd);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ width: "90%", maxWidth: 500 }}>
        <TextInput
          style={styles.inputField}
          value={email}
          placeholder="email"
          placeholderTextColor={"rgba(255, 255, 255, 0.25)"}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="password"
          placeholderTextColor={"rgba(255, 255, 255, 0.25)"}
          value={pswd}
          secureTextEntry
          onChangeText={(text) => setPswd(text)}
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },

  inputField: {
    backgroundColor: "grey",
    borderRadius: 25,
    marginTop: 5,
    fontSize: 28,
    padding: 10,
  },

  button: {
    backgroundColor: "skyblue",
    borderRadius: 25,
    marginTop: 15,
    padding: 10,
    width: "100%",
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 28,
  },
});
