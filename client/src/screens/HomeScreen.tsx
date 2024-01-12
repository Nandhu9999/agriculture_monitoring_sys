import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <View style={{ padding: 10 }}>
        <CustomCard title={"Your Services"} />
      </View>
    </View>
  );
}

function CustomCard({ title }: any) {
  return (
    <Link
      href="/services"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: 250,
        gap: 1,
        height: 270,
        maxWidth: "98%",
        maxHeight: "98%",
        borderRadius: 8,
        position: "relative",
        backgroundColor: "white",
      }}
    >
      <View style={{ height: 20, display: "flex", justifyContent: "flex-end" }}>
        <Text style={{ fontWeight: "700", paddingLeft: 5 }}>Your Services</Text>
      </View>

      <View
        style={{
          left: 0,
          width: 250,
          height: 250,
        }}
      >
        <Image
          style={{
            borderRadius: 8,
            width: 250,
            height: 250,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          resizeMode="cover"
          source={require("../../assets/farm-land-square.png")}
        ></Image>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  customCard: {
    maxWidth: 500,
    aspectRatio: "400/225",

    backgroundColor: "grey",
    borderRadius: 15,
    position: "relative",
    // borderColor: "white",
    borderColor: "black",
    borderWidth: 6,
    borderBottomWidth: 25,
  },

  cardTitleView: {
    position: "absolute",
    // height: "100%",
    width: "100%",
    maxWidth: 500,
    aspectRatio: "8/5",

    justifyContent: "center",
    textAlign: "center",
    zIndex: 2,
  },

  cardText: {
    fontSize: 30,
    top: 0,
    left: 0,
    fontWeight: "700",
    color: "white",
    width: "100%",
    // textShadowColor: "rgba(255,255,255,0.35)",
    // textShadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // textShadowRadius: 5,
  },

  cardContent: {},
  cardImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
