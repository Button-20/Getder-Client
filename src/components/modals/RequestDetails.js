import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { useCarTypesContext } from "../../context/CarTypesContext";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";

const RequestDetails = ({
  bottomSheetRef,
  request,
  bottomSheetRef2,
  setRequest,
  postRequest,
  travelTime,
}) => {
  const {carTypes} = useCarTypesContext();

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={["20%", 500]}
      enablePanDownToClose={false}
    >
      <View>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetHeaderText}>
            Recommended price GHS12,900
          </Text>
          <Text style={styles.bottomSheetHeaderText}>
            Travel time: {travelTime ? `~${travelTime.duration.text}` : "Calculating..."}
          </Text>
        </View>
        <View>
          <View style={styles.ridesContainer}>
            {carTypes.map((rideType) => (
              <TouchableOpacity
                key={rideType._id}
                activeOpacity={0.8}
                onPress={() =>
                  setRequest({ ...request, car_type: rideType.type })
                }
                style={[
                  styles.rideTypeContainer,
                  {
                    borderColor:
                      request.car_type === rideType.type
                        ? Colors.primary
                        : "lightgray",
                    backgroundColor:
                      request.car_type === rideType.type
                        ? Colors.bg_whitesmoke
                        : "white",
                  },
                ]}
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
          <TouchableOpacity
            style={styles.fareContainer}
            onPress={() => {
              bottomSheetRef.current.close();
              bottomSheetRef2.current.present();
            }}
          >
            <Text style={styles.fareText}>GHS{request.suggested_price}</Text>
            <Text style={styles.fareSubText}>
              Recommended fare, Click to adjust
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentsContainer}>
            <Text style={styles.fareText}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.requestButton}
            activeOpacity={0.8}
            onPress={postRequest}
          >
            <Text style={styles.requestButtonText}>Find a driver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default RequestDetails;

const styles = StyleSheet.create({
  bottomSheetHeader: {
    backgroundColor: Colors.text_muted_light,
    width: "90%",
    height: 62,
    marginTop: Spacing.s,
    alignItems: "center",
    alignSelf: "center",
    padding: Spacing.s,
    justifyContent: "center",
    borderRadius: BorderRadii.m,
  },
  bottomSheetHeaderText: {
    textAlign: "center",
    fontFamily: Fonts.bold,
    color: Colors.primary,
    fontSize: FontSizes.s,
  },
  ridesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.l,
  },
  rideTypeContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "25%",
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
  fareContainer: {
    marginTop: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text_muted_light,
    width: "90%",
    alignSelf: "center",
    paddingBottom: Spacing.l,
  },
  fareText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
  },
  fareSubText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
  },
  paymentsContainer: {
    marginTop: Spacing.l,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  requestButton: {
    backgroundColor: Colors.accent,
    padding: Spacing.m,
    borderRadius: BorderRadii.l,
    marginTop: Spacing.xl,
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
