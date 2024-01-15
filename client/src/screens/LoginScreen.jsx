import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
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
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import COLORS from "../themes/colors";
import UserContext from "../contexts/UserContext";
import CustomButton from "../components/CustomButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const { setUser } = useContext(UserContext);
  const auth = FIREBASE_AUTH;

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (u) => {
  //     setUser(u);
  //   });
  //   setPswd("");
  //   setEmail("");
  // }, []);

  const navigation = useNavigation();
  async function handleRegister() {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, pswd);
      console.log("Registered as", response.user.email);
      setUser(response.user);
      navigation.navigate({ name: "(drawer)" });
    } catch (err) {
      console.log(err);
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
      const response = await signInWithEmailAndPassword(auth, email, pswd);
      console.log("Logged in as", response.user.email);
      navigation.navigate({ name: "(drawer)" });
    } catch (err) {
      console.log(err);
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
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (err) {
      console.log(err);
      const errMsg = "Error occurred";
      if (Platform.OS == "web") {
        alert(errMsg);
      } else {
        Alert.alert("Login Error", errMsg);
      }
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
        <CustomButton text={"Login"} handleFn={handleLogin} outlined={false} />
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "grey",
            borderRadius: 50,
            marginVertical: 15,
          }}
        />
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
            <Image
              style={{
                width: 25,
                height: 25,
                borderRadius: 50,
              }}
              source={{ uri: "https://www.svgrepo.com/show/61540/google.svg" }}
            />
          </TouchableOpacity>
        </View>
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
