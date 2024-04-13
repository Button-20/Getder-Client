import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";

const RateDriver = ({ bottomSheetRef5 }) => {
  return (
    <BottomSheetModal
      ref={bottomSheetRef5}
      index={0}
      snapPoints={["40%"]}
      enablePanDownToClose={true}
      handleComponent={() => null}
      containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>
          You have arrived at your destination 🎉
        </Text>
        <Text style={styles.subHeading}>Your trip has ended</Text>
        <Text style={styles.rateDriverTxt}>Rate your driver</Text>
        <StarRatingDisplay
          rating={4}
          starSize={45}
          emptyColor="#E8E8E8"
          starStyle={{ marginRight: 10, marginBottom: 10 }}
          enableHalfStar={false}
        />
        <TouchableOpacity
          style={styles.requestButton}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <Text style={styles.requestButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default RateDriver;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.accent,
    marginVertical: Spacing.s,
    marginTop: 50,
  },
  subHeading: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
    marginBottom: Spacing.l,
  },
  rateDriverTxt: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    marginBottom: Spacing.s,
  },
  requestButton: {
    backgroundColor: Colors.accent,
    padding: Spacing.m,
    borderRadius: BorderRadii.l,
    marginTop: Spacing.m,
    width: "90%",
    alignSelf: "center",
  },
  requestButtonText: {
    color: "white",
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
    textAlign: "center",
  },
});
