import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import COLORS from "../themes/COLORS";
import UserContext from "../contexts/UserContext";
import CustomButton from "../components/CustomButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const { setUser } = useContext(UserContext);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (u) => {
      setUser(u);
    });
    setPswd("");
    setEmail("");
  }, []);

  const navigation = useNavigation();
  async function handleRegister() {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, pswd);
      console.log("Registered as", response.user.email);
      navigation.navigate({ name: "(drawer)" });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("stop loading");
    }
  }

  async function handleLogin() {
    try {
      const response = await signInWithEmailAndPassword(auth, email, pswd);
      console.log("Logged in as", response.user.email);
      navigation.navigate({ name: "(drawer)" });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("stop loading");
    }
  }

  return (
    <View id="LOGIN_CONTAINER" style={styles.container} behavior="padding">
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.title}>LOGIN</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          placeholderTextColor={"#aaa"}
          autoCapitalize="none"
          value={email}
          onChangeText={(txt) => setEmail(txt)}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor={"#aaa"}
          autoCapitalize="none"
          secureTextEntry={true}
          value={pswd}
          onChangeText={(txt) => setPswd(txt)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text={"Login"} handleFn={handleLogin} />
        <CustomButton
          text={"Register"}
          handleFn={handleRegister}
          outlined={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "80%",
    maxWidth: 300,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 5,
    textShadowColor: COLORS.primary,
    textShadowOffset: {
      width: 1,
      height: 0,
    },
    textShadowRadius: 0,
    color: COLORS.primary,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
