import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideOfferCard from "../../../components/ui/RideOfferCard";
import { useNegotiationContext } from "../../../context/NegotiationContext";
import { useNegotiationsContext } from "../../../context/NegotiationsContext";
import { updateNegotiation } from "../../../services/request.service";
import { listenForNegotiationUpdates } from "../../../services/socket.service";
import { Colors, FontSizes, Fonts, Spacing } from "../../../utils/styles";

const RideOffers = ({ navigation }) => {
  const { negotiations, setNegotiations } = useNegotiationsContext();
  const { setNegotiation } = useNegotiationContext();

  useEffect(() => {
    negotiationUpdateListener();
  }, []);

  const negotiationUpdateListener = async () => {
    try {
      const data = await listenForNegotiationUpdates();
      setNegotiation(data);
      navigation.navigate("RequestRide");
    } catch (error) {
      console.log("Error listening for negotiation updates: ", error);
    }
  };

  const updateOffer = async ({ negotiation_id, status }) => {
    try {
      const resp = await updateNegotiation({
        negotiation_id,
        status,
      });

      if (resp.status === 200) {
        if (status === "accepted") {
          setNegotiations([]);
        } else {
          setNegotiations(
            negotiations.filter((nego) => nego._id !== negotiation_id)
          );
          negotiations.length === 1 && navigation.navigate("RequestRide");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <View style={styles.headerContainer}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RequestRide")}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Drivers</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1, padding: Spacing.l, gap: 20 }}>
        {negotiations.map((nego) => (
          <RideOfferCard
            key={nego._id}
            offer={nego}
            updateOffer={updateOffer}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideOffers;

const styles = StyleSheet.create({
  backButton: {
    padding: Spacing.s,
    backgroundColor: Colors.primary,
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
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  heading: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    flex: 0.5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
