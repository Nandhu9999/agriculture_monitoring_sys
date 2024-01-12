import { StyleSheet, Text } from "react-native";
import COLORS from "../themes/colors";
import { Link } from "expo-router";

export default function LinkButton({
  text,
  href,
  outlined = false,
  replace = false,
  maxWidth,
}: any) {
  if (outlined == false) {
    return (
      <Link
        href={href}
        style={[styles.button, maxWidth != undefined && { maxWidth: maxWidth }]}
        replace={replace}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Link>
    );
  } else {
    return (
      <Link
        href={href}
        style={[
          styles.button,
          styles.buttonOutline,
          maxWidth != undefined && { maxWidth: maxWidth },
        ]}
        replace={replace}
      >
        <Text style={styles.buttonOutlineText}>{text}</Text>
      </Link>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
