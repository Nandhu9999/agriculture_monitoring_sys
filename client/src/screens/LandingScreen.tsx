import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import LinkButton from "../components/LinkButton";
import CustomButton from "../components/CustomButton";
import { useUserStore } from "../store";

export default function LandingScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const auth = FIREBASE_AUTH;
  async function handleLogout() {
    try {
      setUser({ uid: null, email: null, profileName: null });
      await signOut(auth);
      console.log("logged out", user);
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
        {!user?.uid ? (
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
        {user?.uid && (
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
