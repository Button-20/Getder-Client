import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Spacing, Fonts, FontSizes, Colors } from "../../utils/styles";

const CustomToast = ({
  message,
  dangerColor,
  successColor,
  normalColor,
  type,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            type === "success"
              ? successColor
              : type === "normal"
              ? normalColor
              : type === "warning"
              ? "#FFB300"
              : dangerColor,
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.s,
    borderRadius: 30,
    paddingHorizontal: Spacing.l,
    margin: Spacing.m,
    marginBottom: Spacing.s,
  },

  text: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    color: Colors.text_white,
    textAlign: "center",
  },
});
