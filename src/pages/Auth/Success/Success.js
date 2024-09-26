import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfile } from "../../../services/user.service";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../../utils/styles";

/**
 * Functional component for displaying a success message and navigation button
 * @param {object} navigation - The navigation object for navigating between screens
 */
const Success = ({ navigation }) => {
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const resp = await getProfile();
        console.log("Success: ", resp);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    return getUserProfile();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/images/success.png")}
          style={{ width: 80, height: 80 }}
        />
        <Text style={styles.heading}>Congratulations, Dennis</Text>
        <Text style={styles.subHeading}>
          You’ve completed the onboarding, you can start using Drive in now.
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Drive in!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.l,
    backgroundColor: "white",
  },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    marginTop: 20,
  },
  subHeading: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.accent,
    padding: Spacing.l,
    borderRadius: BorderRadii.xl,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Fonts.bold,
    color: "white",
    fontSize: FontSizes.m,
  },
});
