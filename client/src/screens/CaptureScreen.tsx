import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import COLORS from "../themes/colors";
import { uploadImageToServer } from "../api/device";
import { triggerFileSelect } from "../scripts/discordUpload";

const FormData = global.FormData;
export default function CaptureScreen() {
  const [imageFile, setImage] = useState<any>();

  async function uploadImage(mode: string) {
    // async function afterFileSelected(file: any) {
    //   await saveImage(file);
    // }
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
        await saveImage(result.assets[0]);
      }
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    }
  }

  async function saveImage(file: any) {
    try {
      console.log("image uri saved");
      setImage(file);
    } catch (err) {
      throw err;
    }
  }

  const sendToBackend = async () => {
    try {
      const response = await uploadImageToServer(imageFile);
    } catch (err) {
      console.error("An error occurred on upload..", err);
    }
  };

  const [modelResponse, setModelRes] = useState("...");
  function scanImage() {
    console.log("scan image");
    sendToBackend();
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageFile?.uri }}
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
