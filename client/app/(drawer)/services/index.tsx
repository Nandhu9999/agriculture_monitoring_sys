import { StyleSheet, View } from "react-native";
import ServicesScreen from "../../../src/screens/ServicesScreen";

export default function ServicesPage() {
  return (
    <View style={styles.container}>
      <ServicesScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
