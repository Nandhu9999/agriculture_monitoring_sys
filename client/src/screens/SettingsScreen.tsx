import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "expo-router";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import CustomButton from "../components/CustomButton";
import LinkButton from "../components/LinkButton";
import { useUserStore } from "../store";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const auth = FIREBASE_AUTH;
  async function handleLogout() {
    try {
      await signOut(auth);
      setUser({ uid: null, email: null, profileName: null });
      console.log("logged out", user);
      navigation.navigate({ name: "login" });
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
