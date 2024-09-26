import { AntDesign } from "@expo/vector-icons";
import { decode as atob } from "base-64";
import * as Google from "expo-auth-session/providers/google";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useSpinnerContext } from "../../../context/SpinnerContext";
import { useUserContext } from "../../../context/UserContext";
import { storageService } from "../../../lib/storage.service";
import { getProfile, postLogin, sendOtp } from "../../../services/user.service";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../../utils/styles";
import { phoneValidation } from "../../../utils/validations";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const { spinner, setSpinner } = useSpinnerContext();

  const { setUser } = useUserContext();

  const toast = useToast();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    profile_picture: "",
    phone: "",
    authMethod: "local",
    email: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    authMethod: "",
    email: "",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setSpinner(true);
      const { authentication } = response;
      let { idToken } = authentication;

      // Decode the ID token
      idToken = atob(idToken.split(".")[1]);

      const { email, given_name, family_name } = JSON.parse(idToken);

      setForm({
        ...form,
        email,
        authMethod: "google",
        firstname: given_name,
        lastname: family_name,
      });
      (async () => {
        const res = await postLogin({
          ...form,
          phone: "",
        });
        setSpinner(false);
        if (res.status == 200) {
          setSpinner(false);
          await storageService.setAccessToken(res.token);
          const resp = await getProfile();
          setUser(resp.data);
          navigation.navigate("MainLayout");
          return;
        }

        if (res.status == 201) {
          navigation.navigate("Success");
          return;
        }

        if (res.status == 400) {
          toast.show(res.message, {
            type: "danger",
          });
          return;
        }
      })();
    }
  }, [response]);

  const handleTextChange = (key, value) => {
    if (key === "phone") {
      if (phoneValidation(value)) {
        setErrors({ ...errors, phone: phoneValidation(value) });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }

    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      // Validate the form
      if (!form.phone) {
        setErrors({ ...errors, phone: "Phone number is required" });
        return;
      }
      setErrors({ ...errors, phone: "" });

      setSpinner(true);
      // If there are no errors, submit the form
      const resp = await postLogin({
        phone: form.phone,
        authMethod: "local",
      });

      if (resp.status == 200) {
        const resp2 = await sendOtp(form.phone);
        if (!resp2?.status) throw new Error(resp2?.message);

        navigation.navigate("VerifyCode", { phone: form.phone, login: true });
        setForm({ ...form, phone: "" });
        setSpinner(false);
      } else {
        console.log("Error: ", resp);
        setSpinner(false);
        toast.show(resp?.message, {
          type: "danger",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="white" />
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome back!</Text>
        <Text style={[styles.subHeading, { marginBottom: Spacing.xl }]}>
          Please enter your credentials to access your account.
        </Text>
        <Text style={styles.subHeading}>Phone Number</Text>
        <PhoneInput
          value={form.phone}
          defaultCode="GH"
          containerStyle={styles.formInput}
          textContainerStyle={{
            width: "100%",
            backgroundColor: "#fff",
          }}
          textInputStyle={{
            fontFamily: Fonts.regular,
            fontSize: FontSizes.m,
          }}
          codeTextStyle={{
            fontFamily: Fonts.regular,
            fontSize: FontSizes.m,
          }}
          onChangeFormattedText={(text) => {
            handleTextChange("phone", text);
          }}
        />
        {errors.phone ? (
          <Text style={styles.textDanger}>{errors.phone}</Text>
        ) : null}
        <View style={styles.dividerContainer}>
          <View style={styles.divider}></View>
          <Text
            style={{
              marginHorizontal: Spacing.s,
              fontFamily: Fonts.regular,
              color: Colors.text_muted_dark,
            }}
            id="recaptcha-container"
          >
            or login with
          </Text>
          <View style={styles.divider}></View>
        </View>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => {
            try {
              promptAsync();
            } catch (error) {
              console.log("Error: ", error);
            }
          }}
          activeOpacity={0.7}
          disabled={spinner}
        >
          {form.authMethod == "google" && spinner ? (
            <ActivityIndicator size={24} color="#1B1C20" />
          ) : (
            <>
              <AntDesign name="google" size={24} color="#1B1C20" />
              <Text style={styles.googleButtonText}>Login with Google</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={
            isValidNumber(form.phone)
              ? styles.loginButton
              : {
                  ...styles.loginButton,
                  backgroundColor: Colors.button_disabled_2,
                }
          }
          onPress={() => handleSubmit()}
          disabled={!isValidNumber(form.phone) || spinner}
        >
          {form.authMethod == "local" && spinner ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: Spacing.l,
          }}
        >
          <Text style={styles.subHeading}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={[
                styles.subHeading,
                { color: Colors.primary, fontFamily: Fonts.bold },
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.l,
    backgroundColor: "white",
    flex: 1,
  },
  heading: {
    fontSize: FontSizes.l,
    fontFamily: Fonts.bold,
    marginTop: Spacing.l,
    marginBottom: Spacing.s,
  },
  subHeading: {
    fontSize: FontSizes.s,
    fontFamily: Fonts.regular,
    color: Colors.text_muted,
  },
  formInput: {
    paddingHorizontal: Spacing.s,
    marginVertical: Spacing.s,
    borderWidth: 0.5,
    borderColor: Colors.text_muted,
    borderRadius: BorderRadii.s,
    fontFamily: Fonts.regular,
    width: "100%",
  },
  formInputContainer: {
    position: "relative",
  },
  formInputIcon: {
    position: "absolute",
    right: Spacing.m,
    top: 30,
  },
  textDanger: {
    color: "red",
    fontSize: FontSizes.s,
    fontFamily: Fonts.regular,
    marginBottom: Spacing.s,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: Spacing.s,
  },
  forgotPasswordText: {
    fontSize: FontSizes.s,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.l,
  },
  divider: {
    flex: 1,
    height: 0.5,
    backgroundColor: Colors.text_muted,
  },
  googleButton: {
    padding: Spacing.l,
    borderRadius: BorderRadii.m,
    marginTop: Spacing.l,
    borderColor: Colors.border_muted,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.s,
    borderWidth: 0.5,
  },
  googleButtonText: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.bold,
    textAlign: "center",
  },
  loginButton: {
    padding: Spacing.l,
    borderRadius: BorderRadii.m,
    marginTop: Spacing.xl,
    backgroundColor: Colors.accent,
  },
  loginButtonText: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.medium,
    textAlign: "center",
    color: Colors.text_white,
  },
});
