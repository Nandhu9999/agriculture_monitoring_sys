import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import LinkButton from "../components/LinkButton";
import CustomButton from "../components/CustomButton";

export default function LandingScreen() {
  const { user, setUser }: any = useContext(UserContext);
  const auth = FIREBASE_AUTH;
  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("logged out");
      setUser({});
    } catch (error) {
      console.log("error while logging out");
    }
  }

  console.log(user);
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
          width: "98%",
        }}
      >
        {Object.keys(user).length == 0 ? (
          <LinkButton
            text={"Login/Register"}
            href={"/login"}
            replace={false}
            maxWidth={200}
          />
        ) : (
          <CustomButton
            text={"Logout"}
            handleFn={handleLogout}
            maxWidth={200}
          />
        )}
        {Object.keys(user).length !== 0 && (
          <View style={{ width: 150 }}>
            <LinkButton
              text={"Home"}
              href={"/home"}
              replace={true}
              maxWidth={200}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
