import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSpinnerContext } from "../../context/SpinnerContext";
import { sendOtp } from "../../services/user.service";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";
import { phoneValidation } from "../../utils/validations";
import { useToast } from "react-native-toast-notifications";

const Register = ({ navigation }) => {
  const [wizard, setWizard] = useState(0);

  const { spinner, setSpinner } = useSpinnerContext();

  const toast = useToast();

  const [form, setForm] = useState({
    phone: "",
    firstname: "",
    lastname: "",
    authMethod: "local",
    email: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    firstname: "",
    lastname: "",
    authMethod: "",
    email: "",
  });

  const handleTextChange = (key, value) => {
    if (key === "phone") {
      if (phoneValidation(value)) {
        setErrors({ ...errors, phone: phoneValidation(value) });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }

    if (key === "firstname") {
      if (!value) {
        setErrors({ ...errors, firstname: "First name is required" });
      } else {
        setErrors({ ...errors, firstname: "" });
      }
    }

    if (key === "lastname") {
      if (!value) {
        setErrors({ ...errors, lastname: "Last name is required" });
      } else {
        setErrors({ ...errors, lastname: "" });
      }
    }

    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      if (form.firstname || form.lastname || form.phone) {
        setSpinner(true);
        const resp = await sendOtp(form.phone);
        if (!resp?.status) throw new Error(resp?.message);

        navigation.navigate("VerifyCode", {
          ...form,
        });
        setSpinner(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.show(error?.message, {
        type: "danger",
      });
    } finally {
      setSpinner(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="white" />
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.heading}>Create Account</Text>
          <Text style={[styles.subHeading, { marginBottom: Spacing.xl }]}>
            Create your account to unlock a world of possibilities.
          </Text>
          {wizard === 0 && (
            <>
              <Text style={styles.subHeading}>First Name</Text>
              <TextInput
                value={form.firstname}
                style={[
                  styles.formInput,
                  {
                    padding: Spacing.m,
                    fontSize: FontSizes.m,
                  },
                ]}
                onChangeText={(text) => handleTextChange("firstname", text)}
              />
              {errors.firstname ? (
                <Text style={styles.textDanger}>{errors.firstname}</Text>
              ) : null}
            </>
          )}
          {wizard === 1 && (
            <>
              <Text style={styles.subHeading}>Last Name</Text>
              <TextInput
                value={form.lastname}
                style={[
                  styles.formInput,
                  {
                    padding: Spacing.m,
                    fontSize: FontSizes.m,
                  },
                ]}
                onChangeText={(text) => handleTextChange("lastname", text)}
              />
              {errors.lastname ? (
                <Text style={styles.textDanger}>{errors.lastname}</Text>
              ) : null}
            </>
          )}
          {wizard === 2 && (
            <>
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
            </>
          )}
          <View style={styles.dotContainer}>
            <TouchableOpacity onPress={() => setWizard(0)} activeOpacity={0.7}>
              <View
                style={wizard === 0 ? styles.dotActive : styles.dotInactive}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setWizard(1)} activeOpacity={0.7}>
              <View
                style={wizard === 1 ? styles.dotActive : styles.dotInactive}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setWizard(2)} activeOpacity={0.7}>
              <View
                style={wizard === 2 ? styles.dotActive : styles.dotInactive}
              ></View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider}></View>
            <Text
              style={{
                marginHorizontal: Spacing.s,
                fontFamily: Fonts.regular,
                color: Colors.text_muted_dark,
              }}
            >
              or join with
            </Text>
            <View style={styles.divider}></View>
          </View>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.8}
          >
            <AntDesign name="google" size={24} color="#1B1C20" />
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={
              (wizard === 0 && !form.firstname) ||
              (wizard === 1 && !form.lastname) ||
              (wizard === 2 && !form.phone)
                ? {
                    ...styles.loginButton,
                    backgroundColor: Colors.button_disabled_2,
                  }
                : styles.loginButton
            }
            onPress={() => {
              setWizard(wizard < 2 ? wizard + 1 : 2);
              if (wizard === 2) {
                handleSubmit();
              }
            }}
            disabled={
              (wizard === 0 && !form.firstname) ||
              (wizard === 1 && !form.lastname) ||
              (wizard === 2 && !form.phone) ||
              spinner
            }
          >
            <Text style={styles.loginButtonText}>
              {!spinner && wizard < 2
                ? "Next"
                : !spinner && wizard === 2
                ? "Sign Up"
                : ""}
              {spinner && <ActivityIndicator size={24} color="#ffffff" />}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: Spacing.l,
            }}
          >
            <Text style={styles.subHeading}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.subHeading,
                  { color: Colors.primary, fontFamily: Fonts.bold },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.l,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
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
    padding: 2,
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
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.l,
  },
  dotActive: {
    width: 35,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.s,
  },
  dotInactive: {
    width: 25,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.bg_whitesmoke,
    marginHorizontal: Spacing.s,
  },
  section: {},
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
    borderRadius: BorderRadii.xl,
    marginTop: Spacing.xl,
    backgroundColor: Colors.accent,
  },
  loginButtonText: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.bold,
    textAlign: "center",
    color: Colors.text_white,
  },
});
