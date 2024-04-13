import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import MapViewStyle from "../../utils/mapviewstyle.json";
import { Colors } from "../../utils/styles";

const GoogleMapComponent = ({ location, request, mapRef, negotiation }) => {
  return (
    <MapView
      style={styles.map}
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      customMapStyle={MapViewStyle}
      rotateEnabled={false}
    >
      {!request.pickup_location && !request.dropoff_location && (
        <Marker
          coordinate={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          }}
          icon={require("../../../assets/images/location.png")}
        />
      )}
      {request.pickup_location && request.dropoff_location && (
        <MapViewDirections
          origin={{
            latitude: request.pickup_location?.lat,
            longitude: request.pickup_location?.lng,
          }}
          destination={{
            latitude: request.dropoff_location?.lat,
            longitude: request.dropoff_location?.lng,
          }}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}
          strokeWidth={3}
          strokeColor={Colors.accent}

        />
      )}
      {request.pickup_location && (
        <Marker
          coordinate={{
            latitude: request.pickup_location?.lat,
            longitude: request.pickup_location?.lng,
          }}
          description={request.pickup_location.description}
          identifier="pickup"
          icon={
            negotiation
              ? require("../../../assets/images/car-icon.png")
              : require("../../../assets/images/location.png")
          }
        />
      )}
      {request.dropoff_location && (
        <Marker
          coordinate={{
            latitude: request.dropoff_location?.lat,
            longitude: request.dropoff_location?.lng,
          }}
          description={request.dropoff_location.description}
          identifier="dropoff"
          icon={require("../../../assets/images/location.png")}
        />
      )}
    </MapView>
  );
};

export default GoogleMapComponent;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
