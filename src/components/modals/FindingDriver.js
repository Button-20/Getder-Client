import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";

const FindingDriver = ({ navigation, bottomSheetRef3 }) => {
  const movingLine = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.sequence([
      Animated.timing(movingLine, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(movingLine, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <BottomSheetModal
      ref={bottomSheetRef3}
      index={0}
      snapPoints={["35%"]}
      enablePanDownToClose={false}
      handleComponent={() => null}
    >
      <View style={styles.contentContainerStyle}>
        <Animated.View
          style={[
            styles.movingLine,
            {
              transform: [
                {
                  translateX: movingLine.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
                {
                  scaleX: movingLine.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                  }),
                },
              ],
            },
          ]}
        ></Animated.View>
        <Image
          source={require("../../../assets/images/user-search-fill.png")}
          style={styles.image}
        />
        <Text style={styles.headerText}>Finding drivers nearby</Text>
        <Text style={styles.subHeaderText}>
          Your request has been confirmed, now contacting drivers nearby
        </Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            bottomSheetRef3.current.dismiss();
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel the Request</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default FindingDriver;

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 70,
    height: 70,
    objectFit: "contain",
  },
  headerText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    marginTop: 20,
  },
  subHeaderText: {
    fontSize: FontSizes.s,
    textAlign: "center",
    marginTop: 10,
    fontFamily: Fonts.regular,
    color: Colors.text_muted,
    maxWidth: "90%",
  },
  cancelButton: {
    borderColor: Colors.text_danger,
    borderWidth: 1,
    padding: Spacing.m,
    borderRadius: 20,
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.text_danger,
    fontFamily: Fonts.bold,
  },
  movingLine: {
    width: 40,
    height: 5,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
