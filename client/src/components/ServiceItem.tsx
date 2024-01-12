import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import React, { useState } from "react";

export default function ServiceItem({ serviceId }: any) {
  /* Options
    1. Image Feed
    2. Temperature - graph
    3. Humidity - graph
    4. Battery
    5. Map Location
    6. Trigger Switch
  */
  const [imgOpen, setImgOpen] = useState(true);
  const [tempOpen, setTempOpen] = useState(false);
  const [humOpen, setHumOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(true);

  const { height } = useWindowDimensions();
  return (
    <View>
      <View>
        <ScrollView
          fadingEdgeLength={50}
          contentContainerStyle={
            Platform.OS === "web" && {
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }
          }
          style={{
            padding: 5,
            paddingBottom: 50,
            height: height - 64,
          }}
        >
          <ToggleCard
            title={"Camera View"}
            open={imgOpen}
            onToggle={() => {
              setImgOpen(!imgOpen);
            }}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bananal_REFON.jpg",
              }}
              style={{ height: 300, width: "100%" }}
            />
          </ToggleCard>

          <ToggleCard
            title={"Temperature View"}
            open={tempOpen}
            onToggle={() => {
              setTempOpen(!tempOpen);
            }}
          >
            <Image
              source={{
                uri: "https://cdn.britannica.com/98/93498-004-D107554A.gif",
              }}
              style={{ height: 300, width: "100%", objectFit: "cover" }}
            />
          </ToggleCard>

          <ToggleCard
            title={"Humidity View"}
            open={humOpen}
            onToggle={() => {
              setHumOpen(!humOpen);
            }}
          >
            <Image
              source={{
                uri: "https://cdn.corporatefinanceinstitute.com/assets/line-graph.jpg",
              }}
              style={{ height: 300, width: "100%", objectFit: "cover" }}
            />
          </ToggleCard>

          <ToggleCard
            title={"Location"}
            open={mapOpen}
            onToggle={() => {
              setMapOpen(!mapOpen);
            }}
          >
            <Image
              source={{
                uri: "https://i0.wp.com/blog.fieldmargin.com/wp-content/uploads/2021/10/screenshot-2019-07-02-at-17.28.17.png?ssl=1",
              }}
              style={{ height: 300, width: "100%", objectFit: "cover" }}
            />
          </ToggleCard>
        </ScrollView>
      </View>
    </View>
  );
}

function ToggleCard({ title, height, open, onToggle, children }: any) {
  return (
    <View style={[styles.toggleCard, { height: open ? height : 50 }]}>
      <Pressable style={styles.cardHeader} onPress={onToggle}>
        <Text style={styles.cardHeaderText}>{title}</Text>
        <Text>{open ? "🅾️" : "❎"}</Text>
      </Pressable>
      {open && <View>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleCard: {
    width: 300,
    maxHeight: 300 + 50,
    backgroundColor: "rgb(200,200,200)",
    marginBottom: 10,
  },
  cardHeader: {
    backgroundColor: "grey",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  cardHeaderText: {
    fontSize: 25,
  },
});
