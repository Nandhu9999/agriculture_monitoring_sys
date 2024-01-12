import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function LandingScreen() {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "black" }}>LandingScreen</Text>
      <Link href="/login" style={styles.btn}>
        <Text>Login/Register</Text>
      </Link>
      <Link href="/home" style={styles.btn}>
        <Text>Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 20,
    backgroundColor: "orange",
    width: 200,
    marginTop: 10,
    borderRadius: 25,
  },
});
