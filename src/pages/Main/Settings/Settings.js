import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, FontSizes, Fonts, Spacing } from "../../../utils/styles";

const Settings = ({ navigation }) => {
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
          <Text style={styles.heading}>Settings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

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
