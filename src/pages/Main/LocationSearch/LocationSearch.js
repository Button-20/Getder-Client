import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleSearchInput from "../../../components/forms/GoogleSearchInput";
import { useLocationContext } from "../../../context/LocationContext";
import { useRequestContext } from "../../../context/RequestContext";
import { Colors, Fonts, Spacing } from "../../../utils/styles";

const LocationSearch = ({ navigation }) => {
  const { request, setRequest } = useRequestContext();

  const { location } = useLocationContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <View style={styles.headerContainer}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={24} color={Colors.accent} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Your Route</Text>
        </View>
      </View>
      <GoogleSearchInput
        setRequest={setRequest}
        request={request}
        navigation={navigation}
        currentLocation={location}
      />
    </SafeAreaView>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  backButton: {
    padding: Spacing.s,
    backgroundColor: Colors.bg_white,
    borderRadius: 50,
  },
  navContainer: {
    flex: 0.5,
    flexDirection: "row",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.l,
  },
  heading: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    flex: 0.5,
  },
});
