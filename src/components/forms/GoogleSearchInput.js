import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { BorderRadii, Colors, Fonts, Spacing } from "../../utils/styles";

navigator.geolocation = require("@react-native-community/geolocation");

const GoogleSearchInput = ({
  setRequest,
  request,
  navigation,
  currentLocation,
}) => {
  useEffect(() => {
    if (request.dropoff_location && request.pickup_location) {
      navigation.navigate("RequestRide");
    }
  }, [request.dropoff_location, request.pickup_location]);

  useEffect(() => {
    if (currentLocation) {
      setRequest({
        ...request,
        pickup_location: {
          description: currentLocation.description,
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        },
      });
    }
  }, [currentLocation]);

  return (
    <View style={styles.requestInputsContainer}>
      <Image
        source={require("../../../assets/images/inverted-pins.png")}
        style={styles.invertedPins}
      />
      <View style={styles.requestInputs}>
        <GooglePlacesAutocomplete
          placeholder="Select your location"
          onPress={(data, details = null) => {
            details = details?.geometry?.location;
            details.description = data.description;
            setRequest({ ...request, pickup_location: details });
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
          fetchDetails={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          styles={{
            container: {
              width: "85%",
            },
            textInput: styles.input,
            listView: {
              position: "absolute",
              top: 120,
              left: -30,
              width: "110%",
            },
            description: {
              fontFamily: Fonts.medium,
              paddingVertical: 7,
            },
          }}
          enablePoweredByContainer={false}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
            language: "en",
            components: "country:gh",
            types: "geocode",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Select your destination"
          fetchDetails={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          styles={{
            container: {
              width: "85%",
            },
            textInput: styles.input,
            listView: {
              position: "absolute",
              top: 120 / 2,
              left: -30,
              width: "110%",
            },
            description: {
              fontFamily: Fonts.medium,
              paddingVertical: 7,
            },
          }}
          onPress={(data, details = null) => {
            details = details?.geometry?.location;
            details.description = data.description;
            setRequest({ ...request, dropoff_location: details });
          }}
          enablePoweredByContainer={false}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
            language: "en",
            components: "country:gh",
            types: "geocode",
          }}
        />
      </View>
    </View>
  );
};

export default GoogleSearchInput;

const styles = StyleSheet.create({
  requestInputsContainer: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.m,
    borderRadius: BorderRadii.l,
    height: 120,
  },
  invertedPins: {
    width: 20,
    height: "70%",
    objectFit: "contain",
  },
  requestInputs: {
    width: "100%",
    marginLeft: Spacing.m,
    gap: Spacing.s,
  },
  input: {
    padding: Spacing.s,
    borderColor: "lightgray",
    borderRadius: 4,
    width: "85%",
    marginBottom: Spacing.s,
    backgroundColor: Colors.text_muted_light,
    fontFamily: Fonts.medium,
  },
});
