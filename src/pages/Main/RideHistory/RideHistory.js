import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Car from "../../../../assets/images/car-muted.svg";
import { Colors, FontSizes, Fonts, Spacing } from "../../../utils/styles";

const RideHistory = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar style="dark" backgroundColor="transparent" />
      <View style={styles.headerContainer}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Ride history</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.smallHeading}>February 2024</Text>
        {Array(4)
          .fill(0)
          .map((_, index) => {
            return (
              <View style={styles.historyItem} key={index}>
                <View style={styles.firstColumn}>
                  <Car width={50} height={50} />
                  <View>
                    <Text style={styles.paragraphText}>
                      Lekki palm city ......
                    </Text>
                    <Text style={styles.smallParagraphText}>
                      {" "}
                      10 Feb, 20:37
                    </Text>
                  </View>
                </View>
                <View style={styles.secondColumn}>
                  <Text style={styles.price}>₦1,000</Text>
                </View>
              </View>
            );
          })}
        <Text style={[styles.smallHeading, { marginTop: 20 }]}>
          January 2024
        </Text>
        {Array(4)
          .fill(0)
          .map((_, index) => {
            return (
              <View style={styles.historyItem} key={index}>
                <View style={styles.firstColumn}>
                  <Car width={50} height={50} />
                  <View>
                    <Text style={styles.paragraphText}>
                      Lekki palm city ......
                    </Text>
                    <Text style={styles.smallParagraphText}>
                      {" "}
                      10 Feb, 20:37
                    </Text>
                  </View>
                </View>
                <View style={styles.secondColumn}>
                  <Text style={styles.price}>₦1,000</Text>
                </View>
              </View>
            );
          })}
      </View>
    </SafeAreaView>
  );
};

export default RideHistory;

const styles = StyleSheet.create({
  backButton: {
    padding: Spacing.s,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  navContainer: {
    flex: 0.4,
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
    flex: 0.6,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bodyContainer: {
    padding: Spacing.l,
  },
  smallHeading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.s,
    marginBottom: Spacing.l,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
    paddingVertical: Spacing.s,
  },
  firstColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondColumn: {
    alignItems: "flex-end",
  },
  paragraphText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.m,
    marginBottom: Spacing.xs,
  },
  smallParagraphText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
  },
});
