import { Feather, MaterialIcons } from "@expo/vector-icons";
import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useCarTypesContext } from "../../../context/CarTypesContext";
import { useLocationContext } from "../../../context/LocationContext";
import { storageService } from "../../../lib/storage.service";
import {
  getCarTypes,
  getReverseGeocode,
} from "../../../services/miscellaneous.service";
import { joinSocketServer } from "../../../services/socket.service";
import MapViewStyle from "../../../utils/mapviewstyle.json";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../../utils/styles";

const Home = ({ navigation }) => {
  const { location, setLocation } = useLocationContext();

  const { carTypes, setCarTypes } = useCarTypesContext();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      Geolocation.getCurrentPosition(async ({ coords }) => {
        const { results } = await getReverseGeocode(
          `${coords.latitude},${coords.longitude}`
        );
        const location = {
          description: results[0].formatted_address,
          coords,
        };

        setLocation(location);
        joinSocketServer(await storageService.getAccessToken(), location);
      });
    })();

    getRideTypes();
  }, []);

  const getRideTypes = async () => {
    try {
      const resp = await getCarTypes();
      setCarTypes(resp.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.heading}>Where are you going today?</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("LocationSearch")}
            activeOpacity={0.8}
          >
            <View style={styles.searchContainer}>
              <Feather name="search" size={24} color="black" />
              <Text style={styles.searchInput}>Where to?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.itemHeading}>
              <Text style={[styles.heading, { fontSize: FontSizes.m }]}>
                Your location
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialIcons name="location-pin" size={20} color="black" />
                <Text style={styles.subHeading}>
                  {location?.description?.length > 20
                    ? location?.description?.slice(0, 20) + "..."
                    : location?.description}
                </Text>
              </View>
            </View>
            <View style={styles.mapContainer}>
              {location && (
                <MapView
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  }}
                  customMapStyle={MapViewStyle}
                  loadingEnabled
                  rotateEnabled={false}
                  focusable
                >
                  <Marker
                    coordinate={{
                      latitude: location?.coords.latitude,
                      longitude: location?.coords.longitude,
                    }}
                    icon={require("../../../../assets/images/location.png")}
                  />
                </MapView>
              )}
            </View>
          </View>
          <View>
            <View style={styles.itemHeading}>
              <Text style={[styles.heading, { fontSize: FontSizes.m }]}>
                Features
              </Text>
            </View>
            <View style={styles.ridesContainer}>
              {carTypes.map((rideType) => (
                <TouchableOpacity
                  key={rideType._id}
                  activeOpacity={0.8}
                  style={[styles.rideTypeContainer]}
                >
                  <Image
                    src={rideType.image}
                    style={[
                      styles.rideTypeImage,
                      {
                        width: rideType.type === "Courier" ? 50 : 70,
                        height: rideType.type === "Courier" ? 50 : 70,
                      },
                    ]}
                  />
                  <Text style={styles.rideTypeText}>{rideType.type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.l,
    backgroundColor: Colors.bg_white,
  },
  headingContainer: {
    marginBottom: Spacing.xl,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.l,
  },
  heading: {
    fontSize: FontSizes.l,
    fontFamily: Fonts.bold,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
  },
  searchContainer: {
    flexDirection: "row",
    padding: Spacing.m,
    backgroundColor: "white",
    borderRadius: BorderRadii.xl,
    borderColor: Colors.bg_whitesmoke,
    borderWidth: 1,
    gap: Spacing.s,
  },
  searchInput: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.regular,
    marginLeft: Spacing.s,
    width: "100%",
  },
  itemHeading: {
    marginBottom: Spacing.l,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeading: {
    fontSize: FontSizes.s,
    fontFamily: Fonts.regular,
    color: Colors.text_muted,
  },
  mapContainer: {
    height: 272,
    borderRadius: BorderRadii.m,
    overflow: "hidden",
    marginBottom: Spacing.l,
  },
  map: {
    width: "100%",
    height: 272,
  },
  ridesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.l,
  },
  rideTypeContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "30%",
    minWidth: 70,
    borderRadius: BorderRadii.m,
    borderColor: Colors.text_muted_light,
    borderWidth: 1,
    padding: Spacing.s,
    paddingTop: 0,
  },
  rideTypeImage: {
    width: 70,
    height: 70,
    objectFit: "contain",
  },
  rideTypeText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.s,
    marginTop: Spacing.s,
  },
});
