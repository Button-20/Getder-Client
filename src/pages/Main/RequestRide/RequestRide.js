import { Feather } from "@expo/vector-icons";
import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChatModal from "../../../components/modals/ChatModal";
import DriverDetails from "../../../components/modals/DriverDetails";
import EditFare from "../../../components/modals/EditFare";
import FindingDriver from "../../../components/modals/FindingDriver";
import RateDriver from "../../../components/modals/RateDriver";
import RequestDetails from "../../../components/modals/RequestDetails";
import GoogleMapComponent from "../../../components/ui/GoogleMapComponent";
import { useCarTypesContext } from "../../../context/CarTypesContext";
import { useLocationContext } from "../../../context/LocationContext";
import { useNegotiationContext } from "../../../context/NegotiationContext";
import { useNegotiationsContext } from "../../../context/NegotiationsContext";
import { useRequestContext } from "../../../context/RequestContext";
import {
  getReverseGeocode,
  getTravelTime,
} from "../../../services/miscellaneous.service";
import { createRequest } from "../../../services/request.service";
import {
  listenForNegotiationUpdates,
  listenForNewNegotiations,
} from "../../../services/socket.service";
import { BorderRadii, Colors, Fonts, Spacing } from "../../../utils/styles";

const RequestRide = ({ navigation }) => {
  const { location, setLocation } = useLocationContext();
  const { request, setRequest } = useRequestContext();
  const { negotiation, setNegotiation } = useNegotiationContext();
  const { negotiations, setNegotiations } = useNegotiationsContext();
  const { carTypes } = useCarTypesContext();
  const [travelTime, setTravelTime] = useState(null);
  const bottomSheetRef = useRef(null);
  const bottomSheetRef2 = useRef(null);
  const bottomSheetRef3 = useRef(null);
  const bottomSheetRef4 = useRef(null);
  const bottomSheetRef5 = useRef(null);
  const bottomSheetRef6 = useRef(null);
  const mapRef = useRef(null);

  const openBottomSheet = (bottomSheet) => {
    bottomSheet.current.present();
  };

  const closeBottomSheet = (bottomSheet) => {
    bottomSheet.current.dismiss();
  };

  const submitARequest = async () => {
    try {
      closeBottomSheet(bottomSheetRef);
      openBottomSheet(bottomSheetRef3);

      const resp = await createRequest({
        ...request,
        car_type: carTypes.find((type) => type.type === request.car_type)._id,
      });

      if (resp.status === 400 || resp.status === 500) {
        Alert.alert("Error", resp.message);
        closeBottomSheet(bottomSheetRef3);
        openBottomSheet(bottomSheetRef);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDriverLiveLocation = async () => {
    try {
      const data = await listenForNegotiationUpdates();
      setNegotiation(data);
    } catch (error) {
      console.log("Error listening for negotiation updates: ", error);
    }
  };

  const getLiveLocation = async () => {
    try {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getNewNegotiations = async () => {
    let newNegotiation = await listenForNewNegotiations();
    if (newNegotiation) {
      bottomSheetRef3.current?.close();
      setNegotiations([...negotiations, newNegotiation]);
      navigation.navigate("RideOffers");
    }
  };

  useEffect(() => {
    getNewNegotiations();
    getDriverLiveLocation();
  }, []);

  useEffect(() => {
    if (!negotiation?.request) return;

    openBottomSheet(bottomSheetRef4);

    let pickup_location, dropoff_location;

    if (!negotiation?.request?.driverHasArrived) {
      pickup_location = negotiation?.driver?.locationHistory.pop();
      dropoff_location = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        description: "Current Location",
      };
    }

    console.log(pickup_location, dropoff_location);

    fitMapToCoordinates(pickup_location, dropoff_location);
  }, [negotiation?.request]);

  useEffect(() => {
    const { pickup_location, dropoff_location } = request;
    if (!pickup_location || !dropoff_location) return;

    !negotiation?.request && openBottomSheet(bottomSheetRef);

    fitMapToCoordinates(pickup_location, dropoff_location);
  }, [request.pickup_location, request.dropoff_location]);

  const fitMapToCoordinates = (pickup_location, dropoff_location) => {
    const coords = [pickup_location, dropoff_location];
    setTimeout(() => {
      try {
        mapRef.current.fitToSuppliedMarkers(["pickup", "dropoff"], {
          edgePadding: { top: 500, right: 500, bottom: 500, left: 500 },
        });

        mapRef.current.fitToCoordinates(coords, {
          edgePadding: { top: 500, right: 500, bottom: 500, left: 500 },
        });
      } catch (error) {
        console.log("Error fitting map to coordinates: ", error);
      }
    }, 1000);

    getTravelTime({
      pickup_location: `${pickup_location.lat},${pickup_location.lng}`,
      dropoff_location: `${dropoff_location.lat},${dropoff_location.lng}`,
    })
      .then(({ rows }) => setTravelTime(rows[0].elements[0] || {}))
      .catch((error) => {
        console.log("Error getting travel time: ", error);
      });
  };

  return (
    <View>
      <StatusBar style="dark" backgroundColor="transparent" />
      {location && (
        <GoogleMapComponent
          location={location}
          mapRef={mapRef}
          request={
            negotiation && !negotiation?.request?.driverHasArrived
              ? {
                  pickup_location: negotiation?.driver?.locationHistory.pop(),
                  dropoff_location: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                    description: "Current location",
                  },
                }
              : negotiation && negotiation?.request?.driverHasArrived
              ? negotiation?.request
              : request
          }
          negotiation={negotiation}
        />
      )}
      <TouchableOpacity
        onPress={async () => {
          closeBottomSheet(bottomSheetRef);
          navigation.navigate("LocationSearch");
          setRequest({ pickup_location: null, dropoff_location: null });
        }}
        style={styles.backButton}
        activeOpacity={0.8}
      >
        <Feather name="chevron-left" size={24} color={Colors.accent} />
      </TouchableOpacity>
      {!negotiation?.request && (
        <View style={styles.requestInputsContainer}>
          <Image
            source={require("../../../../assets/images/inverted-pins.png")}
            style={styles.invertedPins}
          />
          <TouchableOpacity
            style={styles.requestInputs}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("LocationSearch")}
          >
            <Text style={styles.input}>
              {request.pickup_location?.description || "Select your location"}
            </Text>
            <Text style={styles.input}>
              {request.dropoff_location?.description ||
                "Select dropoff location"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <RequestDetails
        bottomSheetRef={bottomSheetRef}
        request={request}
        bottomSheetRef2={bottomSheetRef2}
        setRequest={setRequest}
        postRequest={submitARequest}
        travelTime={travelTime}
      />
      <EditFare
        bottomSheetRef2={bottomSheetRef2}
        request={request}
        setRequest={setRequest}
        bottomSheetRef={bottomSheetRef}
      />
      <FindingDriver
        bottomSheetRef3={bottomSheetRef3}
        navigation={navigation}
      />
      <DriverDetails
        bottomSheetRef4={bottomSheetRef4}
        bottomSheetRef5={bottomSheetRef5}
        navigation={navigation}
        negotiation={negotiation}
      />
      <ChatModal
        bottomSheetRef4={bottomSheetRef4}
        bottomSheetRef5={bottomSheetRef5}
        negotiation={negotiation}
      />
      <RateDriver bottomSheetRef5={bottomSheetRef6} navigation={navigation} />
    </View>
  );
};

export default RequestRide;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: Spacing.s,
    backgroundColor: Colors.bg_white,
    borderRadius: 50,
  },
  requestInputsContainer: {
    position: "absolute",
    top: 100,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: Spacing.s,
    paddingTop: Spacing.m,
    borderRadius: BorderRadii.l,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
