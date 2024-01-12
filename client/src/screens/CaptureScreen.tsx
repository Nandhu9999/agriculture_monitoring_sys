import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import COLORS from "../themes/colors";

const FormData = global.FormData;
export default function CaptureScreen() {
  const [image, setImage] = useState<string>();

  async function uploadImage(mode: string) {
    try {
      let result: any = {};
      if (mode === "gallary") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: false,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    }
  }

  async function saveImage(image: string) {
    try {
      setImage(image);
      sendToBackend();
    } catch (err) {
      throw err;
    }
  }

  const sendToBackend = async () => {
    try {
      const formdata: any = new FormData();

      formdata.append("image", {
        uri: image,
        type: "image/png",
        name: "userImage",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: () => {
          return formdata;
        },
      };

      await axios.post("", formdata, config);
    } catch (err) {}
  };

  const [modelResponse, setModelRes] = useState("hey");
  function scanImage() {
    console.log("scan image");
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={{
          width: 260,
          maxWidth: "98%",
          aspectRatio: "1/1",
          borderRadius: 20,
          borderColor: COLORS.primary,
          backgroundColor: "rgba(0,0,0,0.15)",
          borderWidth: 2,
          marginTop: 30,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 2,
          marginTop: 30,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <View style={{ width: 130 }}>
          <CustomButton
            text={"Use Camera"}
            handleFn={() => {
              uploadImage("");
            }}
            outlined={true}
          />
        </View>
        <View style={{ width: 130 }}>
          <CustomButton
            text={"Use Gallary"}
            handleFn={() => {
              uploadImage("gallary");
            }}
            outlined={true}
          />
        </View>
      </View>

      {modelResponse !== "" && (
        <View
          style={{
            width: 260,
            maxWidth: "98%",
            backgroundColor: "rgba(0,0,0,0.15)",
            borderRadius: 5,
            padding: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Model Prediction:</Text>
          <View>
            <Text>{modelResponse}</Text>
          </View>
        </View>
      )}

      <View style={{ width: 260, maxWidth: "98%", marginTop: 5 }}>
        <CustomButton text={"Scan Image"} handleFn={scanImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
