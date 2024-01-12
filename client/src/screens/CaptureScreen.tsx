import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={{
          height: 250,
          width: 250,
          borderRadius: 20,
          borderColor: "grey",
          borderWidth: 5,
          marginTop: 30,
        }}
      />

      <View style={{ flexDirection: "row", gap: 2, marginTop: 30 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            uploadImage("");
          }}
        >
          <Text style={{ color: "white" }}>Use Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            uploadImage("gallary");
          }}
        >
          <Text style={{ color: "white" }}>Use Gallary</Text>
        </TouchableOpacity>
      </View>

      <Button title="SUBMIT" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "grey",
    padding: 15,
  },
});
