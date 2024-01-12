import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../themes/COLORS";

export default function CustomButton({
  text,
  handleFn,
  outlined = false,
}: any) {
  if (outlined == false) {
    return (
      <TouchableOpacity onPress={handleFn} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={handleFn}
        style={[styles.button, styles.buttonOutline]}
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
