import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Success from "./Success/Success";
import VerifyCode from "./VerifyCode/VerifyCode";

const Stack = createNativeStackNavigator();

const AuthLayout = () => {
  const stackAuthNavigations = [
    {
      name: "Login",
      component: Login,
    },
    {
      name: "Register",
      component: Register,
    },
    {
      name: "Success",
      component: Success,
    },
    {
      name: "VerifyCode",
      component: VerifyCode,
    },
  ];

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {stackAuthNavigations.map((navigation, index) => (
        <Stack.Screen
          key={index}
          name={navigation.name}
          component={navigation.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthLayout;
