import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePhoneAuthContext } from "../../context/PhoneAuthContext";
import { useSpinnerContext } from "../../context/SpinnerContext";
import { useUserContext } from "../../context/UserContext";
import { storageService } from "../../lib/storage.service";
import {
  getProfile,
  postLogin,
  postRegister,
} from "../../services/user.service";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";

const VerifyCode = ({ navigation }) => {
  const { phoneAuth, setPhoneAuth } = usePhoneAuthContext();

  const { spinner, setSpinner } = useSpinnerContext();

  const { setUser } = useUserContext();

  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (otp.length === 6) {
      (async () => {
        await handleSubmit();
      })();
    }
  }, [otp]);

  const handleSubmit = async () => {
    try {
      // Validate the form
      if (!otp) return;

      setSpinner(true);
      // If there are no errors, submit the form
      const userCredentials = await phoneAuth.confirm(otp);

      const registeringUser = await storageService.getRegisterUser();
      let resp;
      if (registeringUser) {
        resp = await postRegister(registeringUser);
        await storageService.removeRegisterUser();
      } else {
        resp = await postLogin({
          phone: userCredentials.user.phoneNumber,
          authMethod: "local",
        });
      }
      await storageService.setAccessToken(resp.token);
      setUser((await getUserProfile()) || null);
      setPhoneAuth(null);
      setOtp("");
      navigation.navigate("MainLayout");
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      console.log("Error: ", error);
    }
  };

  const getUserProfile = async () => {
    try {
      const resp = await getProfile();
      return resp.data;
    } catch (error) {
      console.log("Error: ", error);
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
              numberOfDigits={6}
              focusColor={Colors.accent}
              value={otp}
              autoFocus
              onTextChange={(text) => setOtp(text)}
              theme={{
                pinCodeTextStyle: {
                  fontFamily: Fonts.bold,
                },
              }}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={
              otp.length !== 6
                ? {
                    ...styles.verifyButton,
                    backgroundColor: Colors.button_disabled_2,
                  }
                : styles.verifyButton
            }
            onPress={async () => {
              if (otp.length === 6) {
                await handleSubmit();
              }
            }}
            activeOpacity={0.8}
            disabled={spinner || otp.length !== 6}
          >
            {spinner ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.verifyText}>Verify</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.subText}>
            Didn't receive the code?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                fontWeight: "bold",
              }}
            >
              Resend Code
            </Text>
          </Text>
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
