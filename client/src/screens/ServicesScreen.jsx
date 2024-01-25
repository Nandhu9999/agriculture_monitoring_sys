import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { fetchServicesList } from "../api/services";
import { useQuery } from "@tanstack/react-query";
export default function ServicesScreen() {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServicesList,
  });
  function renderItem(props) {
    return <ServiceItem {...props.item} />;
  }

  const { height } = useWindowDimensions();

  if (isLoading) {
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      </View>
    );
  }

  if (isError || data?.status == "error") {
    console.log(data?.status);
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>An error occurred..</Text>
        <View>
          {data?.status == "error" && (
            <Text
              style={{
                padding: 4,
                backgroundColor: "rgba(0,0,0,.9)",
                color: "white",
                borderRadius: 5,
              }}
            >
              {data?.reason}
            </Text>
          )}
        </View>
      </View>
    );
  }

  if (data?.status == "ok" && data?.services?.length == 0) {
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          You do not have any services.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ height: "100%" }}>
      {data?.services?.length && (
        <FlatList
          data={data?.services}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          ListFooterComponent={<View style={{ height: 100 }} />}
          style={{ height: height - 64 }}
          fadingEdgeLength={40}
        />
      )}
    </View>
  );
}

function ServiceItem({ serviceId, url, name }) {
  return (
    <Pressable style={styles.serviceItemWrapper}>
      <Link href={url} style={styles.serviceItem}>
        <View>
          <Image
            source={require("../../assets/camera-leaf.jpg")}
            style={styles.serviceItemLogo}
          />
        </View>
        <View style={styles.serviceInsideWrapper}>
          <View></View>
          <Text style={styles.serviceItemText} numberOfLines={1}>
            {name}
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              paddingRight: 10,
            }}
          >
            <Pressable
              onPress={(e) => {
                e.preventDefault();
                alert("You have clicked the options");
              }}
            >
              <Text>ooo</Text>
            </Pressable>
          </View>
        </View>
      </Link>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  serviceItemWrapper: {
    shadowColor: "rgba(0,0,0,0.25)",
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 1,
    },
    maxWidth: 500,
    width: "auto",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 28,
    borderColor: "rgba(0,0,0,0.25)",
    borderWidth: 3,
  },
  serviceItem: {
    maxWidth: 500,
    width: "auto",
    height: 100,
    backgroundColor: "#36973d",
    borderRadius: 26,
    display: "flex",
    overflow: "hidden",
  },
  serviceItemLogo: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 26,
    borderTopLeftRadius: 26,
  },
  serviceInsideWrapper: {
    width: "auto",
    height: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
    overflow: "hidden",
  },
  serviceItemText: {
    fontSize: 22,
    width: "auto",
    overflow: "hidden",
  },
});
