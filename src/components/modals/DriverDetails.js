import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CashIcon from "../../../assets/images/cash.svg";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";

const DriverDetails = ({ bottomSheetRef5, bottomSheetRef4, negotiation }) => {
  return (
    <BottomSheetModal
      ref={bottomSheetRef4}
      index={0}
      snapPoints={["40%", "100%"]}
      enablePanDownToClose={false}
      handleComponent={() => null}
    >
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.heading}>Mark has arrived</Text>
            <Text style={styles.subHeading}>
              Meet your driver at your pick up location
            </Text>
          </View>
          <Text style={styles.time}>0 {"\n"}min</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.driverContainer}>
            <View>
              <Text
                style={[
                  styles.heading,
                  { fontSize: FontSizes.l, marginBottom: Spacing.s },
                ]}
              >
                {(negotiation?.driver?.firstname || "John") +
                  " " +
                  (negotiation?.driver?.lastname || "Doe")}
              </Text>
              <Text style={[styles.subHeading, { fontSize: FontSizes.s }]}>
                Toyota Corolla | LHC-8956
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity activeOpacity={0.5} style={styles.actionBtn}>
                  <MaterialIcons name="call" size={24} color={Colors.accent} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.actionBtn}
                  onPress={() => {
                    bottomSheetRef4.current?.dismiss();
                    bottomSheetRef5.current?.present();
                  }}
                >
                  <MaterialCommunityIcons
                    name="message-minus"
                    size={24}
                    color={Colors.accent}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Image
                source={
                  negotiation?.driver?.profile_picture
                    ? { uri: negotiation?.driver?.profile_picture }
                    : require("../../../assets/images/avatar2.png")
                }
                style={[
                  styles.avatar,
                  {
                    position: "relative",
                    zIndex: 1,
                    left: -30,
                    borderColor: "white",
                    borderWidth: 2,
                  },
                ]}
              />
              <Image
                source={require("../../../assets/images/car.png")}
                style={[
                  styles.avatar,
                  { position: "absolute", top: 0, right: -12, zIndex: -1 },
                ]}
              />
              <Text style={styles.rating}>
                <Image
                  source={require("../../../assets/images/star.png")}
                  style={styles.star}
                />{" "}
                4.5
              </Text>
            </View>
          </View>
          <View style={styles.rideDetailsContainer}>
            <View style={styles.rideDetailHeader}>
              <Text style={styles.rideDetailHeaderText}>Trip Details</Text>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.rideDetailBtnText}>Edit Trip</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rideDetail}>
              <Image
                source={require("../../../assets/images/inverted-pins.png")}
                style={styles.rideDetailIcon}
              />
              <View style={styles.rideDetailTextContainer}>
                <View>
                  <Text style={styles.rideDetailText}>Pick Up At</Text>
                  <Text style={styles.rideDetailSubText}>
                    {negotiation?.request?.pickup_location?.description ||
                      "Not Available"}
                  </Text>
                </View>
                <View>
                  <Text style={styles.rideDetailText}>Drop Off At</Text>
                  <Text style={styles.rideDetailSubText}>
                    {negotiation?.request?.dropoff_location?.description ||
                      "Not Available"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.rideDetailsContainer}>
            <View style={styles.rideDetailHeader}>
              <Text style={styles.rideDetailHeaderText}>Payment Method</Text>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.rideDetailBtnText}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rideDetail}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: Spacing.m,
                }}
              >
                <CashIcon />
                <View>
                  <Text style={styles.rideDetailSubText}>Cash</Text>
                  <Text
                    style={[
                      styles.rideDetailText,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    Pay at the drop off
                  </Text>
                </View>
              </View>
              <Text style={styles.rideDetailSubText}>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: negotiation?.currency?.code || "USD",
                }).format(negotiation?.price || 0)}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.rideDetailsContainer,
              { borderColor: "transparent", borderBottomWidth: 0 },
            ]}
          >
            <View style={styles.rideDetailHeader}>
              <Text style={styles.rideDetailHeaderText}>More</Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity activeOpacity={0.5} style={styles.option}>
                <Feather name="upload" size={24} color={Colors.text_muted} />
                <Text style={styles.optionText}>Share trip details</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.option}>
                <Feather name="upload" size={24} color={Colors.text_muted} />
                <Text style={styles.optionText}>Contact driver</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.option}>
                <AntDesign name="close" size={24} color={Colors.text_muted} />
                <Text style={styles.optionText}>Cancel trip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};

export default DriverDetails;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: Colors.accent_light,
    padding: Spacing.l,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  subHeading: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.text_muted,
    width: 180,
  },
  time: {
    textAlign: "center",
    backgroundColor: Colors.accent,
    color: "white",
    fontFamily: Fonts.bold,
    padding: Spacing.l,
    fontSize: FontSizes.m,
    borderRadius: BorderRadii.s,
  },
  bodyContainer: {
    padding: Spacing.l,
    paddingHorizontal: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: Spacing.m,
    marginTop: Spacing.m,
  },
  actionBtn: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: Spacing.m,
    borderRadius: 150 / 2,
  },
  driverContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
    paddingBottom: Spacing.l,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  rating: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.s,
    width: 70,
    textAlign: "center",
    position: "absolute",
    bottom: -20,
    backgroundColor: Colors.bg_white,
    padding: Spacing.s,
    zIndex: 1,
    borderRadius: BorderRadii.l,
    borderWidth: 1,
    borderColor: "lightgray",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.115,
    shadowRadius: 5.84,
    elevation: 2,
  },
  star: {
    width: 15,
    height: 15,
    objectFit: "contain",
    marginRight: Spacing.s,
  },
  rideDetailsContainer: {
    marginTop: Spacing.l,
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
    paddingBottom: Spacing.l,
  },
  rideDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rideDetailHeaderText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
  },
  rideDetailBtnText: {
    fontFamily: Fonts.medium,
    color: Colors.text_muted,
  },
  rideDetail: {
    flexDirection: "row",
    gap: Spacing.m,
    marginTop: Spacing.m,
    justifyContent: "space-between",
  },
  rideDetailIcon: {
    objectFit: "contain",
    height: 80,
  },
  rideDetailTextContainer: {
    flex: 1,
    gap: 30,
  },
  rideDetailText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    textTransform: "uppercase",
    color: Colors.text_muted,
  },
  rideDetailSubText: {
    fontFamily: Fonts.bold,
  },
  options: {
    marginTop: Spacing.l,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.m,
    marginBottom: Spacing.l,
  },
  optionText: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.medium,
  },
});
