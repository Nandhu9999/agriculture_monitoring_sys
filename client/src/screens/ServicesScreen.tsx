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
export default function ServicesScreen() {
  const items = [
    { serviceId: 1, url: "/services/1", name: "asdf1" },
    { serviceId: 2, url: "/services/2", name: "asdf2" },
    { serviceId: 3, url: "/services/3", name: "asdf3" },
    { serviceId: 4, url: "/services/4", name: "asdf4" },
    { serviceId: 5, url: "/services/5", name: "asdf5" },
    { serviceId: 6, url: "/services/6", name: "asdf6" },
    { serviceId: 7, url: "/services/7", name: "asdf7" },
    { serviceId: 8, url: "/services/8", name: "asdf8" },
    { serviceId: 9, url: "/services/9", name: "asdf9" },
  ];
  function renderItem(props: any) {
    return <ServiceItem {...props.item} />;
  }

  const { height } = useWindowDimensions();

  return (
    <View style={{ height: "100%" }}>
      {items?.length && (
        <FlatList
          data={items}
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

function ServiceItem({ serviceId, url, name }: any) {
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
