import { Redirect, useNavigation } from "expo-router";
import { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../firebaseConfig";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../themes/colors";
import CustomButton from "../components/CustomButton";
import { createUser } from "../api/user";
import { useUserStore } from "../store";

export default function LoginScreen() {
  const [emailInput, setEmail] = useState("");
  const [pswdInput, setPswd] = useState("");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const auth = FIREBASE_AUTH;

  console.log(user);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (u) => {
      if (u) {
        const { uid, email } = u;
        console.log("Auth State Changed ♻️");
        setUser({ uid, email, profileName: email.split("@")[0] });
        // navigation.navigate({ name: "home" });
        return <Redirect href="/home" />;
      }
    });
    setPswd("");
    setEmail("");
  }, []);

  const navigation = useNavigation();
  async function handleRegister() {
    try {
      console.log("trying to register with..", emailInput, pswdInput);
      const response = await createUserWithEmailAndPassword(
        auth,
        emailInput,
        pswdInput
      );
      const { uid, email } = response.user;
      console.log("Registered Successful ✅", email);
      try {
        await createUser(uid, email);
      } catch (err) {
        console.log("Backend Server Error 💀");
      }
      navigation.navigate({ name: "(drawer)" });
    } catch (err) {
      console.log("Registration Failed ❌", err);
      const errMsg = "Please provide valid email and password";
      if (Platform.OS == "web") {
        alert(errMsg);
      } else {
        Alert.alert("Invalid Credentials", errMsg);
      }
    } finally {
      console.log("stop loading");
    }
  }

  async function handleLogin() {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        emailInput,
        pswdInput
      );
      const { uid, email } = response.user;
      console.log("Login Successful ✅", email);
      setUser({ uid, email });
      navigation.navigate({ name: "(drawer)" });
    } catch (err) {
      console.log("Login Failed ❌", err);
      const errMsg = "User not found";
      if (Platform.OS == "web") {
        alert(errMsg);
      } else {
        Alert.alert("Invalid Credentials", errMsg);
      }
    } finally {
      console.log("stop loading");
    }
  }

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(FIREBASE_APP);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (err) {
      console.log(err);
      const errMsg = "an error occurred";
      if (Platform.OS == "web") {
        alert(errMsg);
      } else {
        Alert.alert("Auth Error", errMsg);
      }
    } finally {
      console.log("stop loading");
    }
  }

  function handleGuestLogin() {
    setUser({
      guest: true,
      profileName: "Guest" + Date.now(),
      email: "",
    });
    navigation.navigate({ name: "(drawer)" });
  }
  return (
    <View id="LOGIN_CONTAINER" style={styles.container} behavior="padding">
      <View style={{ marginTop: 5, marginBottom: 15 }}>
        <Text style={styles.title}>LOGIN</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          placeholderTextColor={"#aaa"}
          autoCapitalize="none"
          selectionColor={COLORS.primary}
          value={emailInput}
          onChangeText={(txt) => setEmail(txt)}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor={"#aaa"}
          autoCapitalize="none"
          selectionColor={COLORS.primary}
          secureTextEntry={true}
          value={pswdInput}
          onChangeText={(txt) => setPswd(txt)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text={"Login"} handleFn={handleLogin} outlined={false} />
        <View
          id={"horizontalLine"}
          style={{
            width: "90%",
            height: 3,
            backgroundColor: "rgba(255,255,255,1)",
            borderRadius: 50,
            marginVertical: 15,
          }}
        />
        {false && (
          <View
            style={{
              width: "100%",
              padding: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleGoogleLogin}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: "rgba(222, 82, 69,.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={"logo-google"} size={25} />
            </TouchableOpacity>
          </View>
        )}
        <CustomButton
          text={"Register"}
          handleFn={handleRegister}
          outlined={true}
        />
        {false && (
          <CustomButton
            text={"Guest Login"}
            handleFn={handleGuestLogin}
            outlined={true}
          />
        )}
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
    marginTop: 30,
  },
});
