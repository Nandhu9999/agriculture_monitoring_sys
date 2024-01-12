import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "expo-router";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import UserContext from "../contexts/UserContext";
import CustomButton from "../components/CustomButton";
import LinkButton from "../components/LinkButton";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, setUser }: any = useContext(UserContext);
  const auth = FIREBASE_AUTH;
  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("logged out");
      setUser({});
      // navigation.navigate({ name: "login" });
    } catch (error) {
      console.log("error while logging out");
    }
  }

  function debug() {
    console.log(user);
  }

  return (
    <View>
      <ScrollView style={{ padding: 10, maxWidth: 500 }}>
        <CustomButton text={"Debug"} handleFn={debug} outlined={true} />
        <LinkButton text={"About Page"} href={"/"} outlined={true} />
        <CustomButton text={"Logout"} handleFn={handleLogout} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
