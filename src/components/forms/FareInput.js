import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BorderRadii, Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";

const FareInput = ({ request, setRequest, bottomSheetRef2 }) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter fare"
          style={styles.priceInput}
          keyboardType="numeric"
          value={request.suggested_price || ""}
          onChangeText={(text) =>
            setRequest({ ...request, suggested_price: text })
          }
        />
        <Text style={[styles.fareSubText, { textAlign: "center" }]}>
          Recommended fare, adjustable
        </Text>
      </View>
      <View
        style={[
          styles.paymentsContainer,
          {
            backgroundColor: Colors.bg_whitesmoke,
            padding: Spacing.m,
            borderRadius: BorderRadii.m,
            justifyContent: "center",
            gap: Spacing.s,
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/cash.png")}
          style={styles.paymentImage}
        />
        <Text
          style={[
            styles.fareText,
            {
              fontFamily: Fonts.medium,
            },
          ]}
        >
          Cash
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => bottomSheetRef2.current.dismiss()}
        style={styles.changeButton}
      >
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FareInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: Spacing.m,
    width: "90%",
    alignSelf: "center",
  },
  priceInput: {
    padding: Spacing.s,
    width: "100%",
    marginBottom: Spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    textAlign: "center",
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
  paymentImage: {
    width: 30,
    height: 30,
    objectFit: "contain",
  },
  paymentsContainer: {
    marginTop: Spacing.l,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  changeButton: {
    backgroundColor: Colors.accent,
    padding: Spacing.m,
    borderRadius: BorderRadii.l,
    width: "90%",
    alignSelf: "center",
    marginTop: Spacing.l,
  },
  changeButtonText: {
    color: Colors.text_white,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
    textAlign: "center",
  },
});
