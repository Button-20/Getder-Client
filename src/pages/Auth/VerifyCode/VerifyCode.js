import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useSpinnerContext } from "../../../context/SpinnerContext";
import { useUserContext } from "../../../context/UserContext";
import { storageService } from "../../../lib/storage.service";
import {
  getProfile,
  postLogin,
  postRegister,
  sendOtp,
  verifyOtp,
} from "../../../services/user.service";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../../utils/styles";

const { width } = Dimensions.get("window");

const VerifyCode = ({ route, navigation }) => {
  const { spinner, setSpinner } = useSpinnerContext();

  const { setUser, setToken } = useUserContext();

  const [otp, setOtp] = useState("");

  const toast = useToast();

  useEffect(() => {}, [otp]);

  const handleSubmit = async (text) => {
    try {
      // Validate the form
      if (text.length !== 4) return;

      setSpinner(true);
      // If there are no errors, submit the form
      const verificationResp = await verifyOtp({
        phone: route.params.phone,
        otp: text,
      });

      if (!verificationResp?.status) throw new Error(verificationResp?.message);

      let resp;

      if (!route.params?.login) {
        resp = await postRegister({ ...route.params });
      } else {
        resp = await postLogin({
          phone: route.params.phone,
          authMethod: "local",
        });
      }
      await storageService.setAccessToken(resp.token);
      setToken(resp.token);
      setUser((await getUserProfile()) || null);
      setOtp("");
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      console.log("Error: ", error);
      toast.show(error?.message, {
        type: "danger",
      });
    }
  };

  const getUserProfile = async () => {
    try {
      const resp = await getProfile();
      return resp.data;
    } catch (error) {
      console.log("Error: ", error);
      toast.show(error?.message, {
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="white" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Verification</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text
            style={[styles.heading, { marginTop: 20, fontSize: FontSizes.m }]}
          >
            Enter verification code
          </Text>
          <Text style={styles.subHeading}>
            Kindly enter the OTP code sent to your phone number
          </Text>
          <View style={styles.inputContainer}>
            <OtpInput
              numberOfDigits={4}
              focusColor={Colors.accent}
              value={otp}
              autoFocus
              onTextChange={(text) => setOtp(text)}
              onFilled={async (text) => await handleSubmit(text)}
              theme={{
                pinCodeTextStyle: {
                  fontFamily: Fonts.bold,
                },
                pinCodeContainerStyle: {
                  width: width / 4 / 1.5,
                },
              }}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={
              otp.length !== 4
                ? {
                    ...styles.verifyButton,
                    backgroundColor: Colors.button_disabled_2,
                  }
                : styles.verifyButton
            }
            onPress={async () => {
              await handleSubmit();
            }}
            activeOpacity={0.8}
            disabled={spinner || otp.length !== 4}
          >
            {spinner ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.verifyText}>Verify</Text>
            )}
          </TouchableOpacity>
          <View style={styles.resendContainer}>
            <Text style={styles.subText}>Didn't receive the code? </Text>
            <TouchableOpacity
              onPress={async () => await sendOtp({ phone: route.params.phone })}
              activeOpacity={0.5}
            >
              <Text
                style={[
                  styles.subText,
                  {
                    textDecorationLine: "underline",
                    fontFamily: Fonts.bold,
                    color: Colors.primary,
                  },
                ]}
              >
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgray",
    width: "100%",
  },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    marginLeft: 10,
  },
  subHeading: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
    paddingVertical: 10,
    paddingHorizontal: Spacing.m - 5,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: Spacing.l,
    justifyContent: "space-between",
  },
  verifyButton: {
    backgroundColor: Colors.accent,
    padding: Spacing.l,
    borderRadius: BorderRadii.xl,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Spacing.l,
  },
  verifyText: {
    fontFamily: Fonts.bold,
    color: "white",
    fontSize: FontSizes.m,
  },

  subText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    textAlign: "center",
    color: Colors.text_muted,
    marginBottom: Spacing.xl,
  },

  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: Spacing.m - 5,
  },

  input: {
    borderWidth: 0.5,
    borderColor: Colors.text_muted,
    borderRadius: BorderRadii.s,
    backgroundColor: "#FAFAFA",
    width: "20%",
    textAlign: "center",
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    paddingVertical: Spacing.s,
  },
});
