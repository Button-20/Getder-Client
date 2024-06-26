import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RequestProvider } from "./src/context/RequestContext";
import { SpinnerProvider } from "./src/context/SpinnerContext";
import { UserProvider } from "./src/context/UserContext";
import Login from "./src/pages/Auth/Login";
import Register from "./src/pages/Auth/Register";
import Success from "./src/pages/Auth/Success";
import VerifyCode from "./src/pages/Auth/VerifyCode";
import MainLayout from "./src/pages/Main/MainLayout";
import * as SplashScreen from "expo-splash-screen";
import CustomToast from "./src/components/ui/CustomToast";
import { Colors } from "./src/utils/styles";
import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigations = [
    {
      name: "Login",
      component: Login,
    },
    {
      name: "Register",
      component: Register,
    },
    {
      name: "VerifyCode",
      component: VerifyCode,
    },
    {
      name: "Success",
      component: Success,
    },
    {
      name: "MainLayout",
      component: MainLayout,
    },
  ];

  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Satoshi: require("./assets/fonts/Satoshi-Regular.otf"),
    "Satoshi Bold": require("./assets/fonts/Satoshi-Bold.otf"),
    "Satoshi Medium": require("./assets/fonts/Satoshi-Medium.otf"),
    "Satoshi Light": require("./assets/fonts/Satoshi-Light.otf"),
    "DM Sans": require("./assets/fonts/DMSans-Regular.ttf"),
    "DM Sans SemiBold": require("./assets/fonts/DMSans-SemiBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <UserProvider>
            <BottomSheetModalProvider mode="modal">
              <SpinnerProvider>
                <ToastProvider
                  placement="top"
                  successColor={Colors.success}
                  dangerColor="#FF5353"
                  normalColor="#FFBD2E"
                  offsetTop={35}
                  duration={5000}
                  renderToast={(props) => <CustomToast {...props} />}
                >
                  <RequestProvider>
                    <Stack.Navigator>
                      {navigations.map((navigation, index) => (
                        <Stack.Screen
                          options={{
                            headerShown: false,
                          }}
                          key={index}
                          name={navigation.name}
                          component={navigation.component}
                        />
                      ))}
                    </Stack.Navigator>
                  </RequestProvider>
                </ToastProvider>
              </SpinnerProvider>
            </BottomSheetModalProvider>
          </UserProvider>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
