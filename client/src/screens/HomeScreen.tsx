import { Link } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";

export default function HomeScreen() {
  const [viewDimensions, setViewDimensions] = useState({ width: 0, height: 0 });

  const onViewLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setViewDimensions({ width, height });
  };

  return (
    <View onLayout={onViewLayout}>
      {/* <Text>HomeScreen</Text> */}
      <View style={{ flex: 1 }}>
        <CustomCard title={"Your Services"} />
      </View>
    </View>
  );
}

function CustomCard({ title }: any) {
  return (
    <TouchableOpacity style={styles.customCard}>
      <View style={{ width: "100%", height: "100%" }}>
        <Link href="/services" style={{ width: "100%", height: "100%" }}>
          <View style={styles.cardTitleView}>
            <Text style={styles.cardText}>{title}</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={{ overflow: "hidden", width: "100%", height: "100%" }}>
              <Image
                style={styles.cardImage}
                blurRadius={0}
                resizeMode="contain"
                source={require("../../assets/farm-land.png")}
              />
            </View>
          </View>
        </Link>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  customCard: {
    maxWidth: 500,
    aspectRatio: "8/5",

    backgroundColor: "grey",
    borderRadius: 15,
    position: "relative",
    // borderColor: "white",
    borderColor: "black",
    borderWidth: 6,
    borderBottomWidth: 25,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  cardTitleView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    zIndex: 2,
  },

  cardText: {
    fontSize: 32,
    top: 0,
    left: 0,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.35)",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 5,
  },

  cardContent: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
