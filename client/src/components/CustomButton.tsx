import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../themes/colors";

export default function CustomButton({
  text,
  handleFn,
  outlined = false,
  maxWidth,
}: any) {
  if (outlined == false) {
    return (
      <TouchableOpacity
        onPress={handleFn}
        style={[styles.button, maxWidth != undefined && { maxWidth: maxWidth }]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={handleFn}
        style={[
          styles.button,
          styles.buttonOutline,
          maxWidth != undefined && { maxWidth: maxWidth },
        ]}
      >
        <Text style={styles.buttonOutlineText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },
});
