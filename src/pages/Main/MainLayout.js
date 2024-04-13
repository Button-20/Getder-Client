import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import CardIcon from "../../../assets/images/card.svg";
import Clock from "../../../assets/images/clock.svg";
import HelpIcon from "../../../assets/images/help.svg";
import SettingsIcon from "../../../assets/images/settings.svg";
import Ticket from "../../../assets/images/ticket.svg";
import CustomDrawerContent from "../../components/ui/CustomDrawerContent";
import { CarTypesProvider } from "../../context/CarTypesContext";
import { LocationProvider } from "../../context/LocationContext";
import { NegotiationProvider } from "../../context/NegotiationContext";
import { NegotiationsProvider } from "../../context/NegotiationsContext";
import authGuard from "../../lib/auth.guard";
import { Fonts } from "../../utils/styles";
import Chat from "./Chat/Chat";
import HelpSupport from "./HelpSupport/HelpSupport";
import Home from "./Home/Home";
import LocationSearch from "./LocationSearch/LocationSearch";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import Profile from "./Profile/Profile";
import PromotionsReferrals from "./PromotionsReferrals/PromotionsReferrals";
import RequestRide from "./RequestRide/RequestRide";
import RideHistory from "./RideHistory/RideHistory";
import RideOffers from "./RideOffers/RideOffers";
import Settings from "./Settings/Settings";

const Drawer = createDrawerNavigator();

const MainLayout = ({ navigations, navigation }) => {
  const navigationsArray = [
    {
      name: "Home",
      component: Home,
      headerShown: true,
      icon: null,
      display: false,
    },
    {
      name: "LocationSearch",
      component: LocationSearch,
      headerShown: false,
      icon: null,
      display: false,
    },
    {
      name: "RequestRide",
      component: RequestRide,
      headerShown: false,
      icon: null,
      display: false,
    },
    {
      name: "Chat",
      component: Chat,
      headerShown: false,
      icon: null,
      display: false,
    },
    {
      name: "RideOffers",
      component: RideOffers,
      headerShown: false,
      icon: null,
      display: false,
    },
    {
      name: "Profile",
      component: Profile,
      headerShown: false,
      icon: null,
      display: false,
    },
    {
      name: "Ride History",
      component: RideHistory,
      headerShown: false,
      icon: <Clock width={24} height={24} />,
      display: true,
    },
    {
      name: "Promotions Referrals",
      component: PromotionsReferrals,
      headerShown: false,
      icon: <Ticket width={24} height={24} />,
      display: true,
    },
    {
      name: "Help Support",
      component: HelpSupport,
      headerShown: false,
      icon: <HelpIcon width={24} height={24} />,
      display: true,
    },
    {
      name: "Payment Methods",
      component: PaymentMethods,
      headerShown: false,
      icon: <CardIcon width={24} height={24} />,
      display: true,
    },
    {
      name: "Settings",
      component: Settings,
      headerShown: false,
      icon: <SettingsIcon width={24} height={24} />,
      display: true,
    },
  ];

  useEffect(() => {
    if (authGuard()) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Login");
    }
  }, []);

  return (
    <LocationProvider>
      <CarTypesProvider>
        <NegotiationsProvider>
          <NegotiationProvider>
            <Drawer.Navigator
              drawerContent={(props) => (
                <CustomDrawerContent
                  {...props}
                  navigationsArray={navigationsArray}
                  navigations={navigations}
                />
              )}
            >
              {navigationsArray.map((navigation, index) => (
                <Drawer.Screen
                  key={index}
                  name={navigation.name}
                  component={navigation.component}
                  options={{
                    headerTitle: "",
                    headerShown: navigation.headerShown,
                    headerStyle: {
                      borderBottomWidth: 0.5,
                      borderBottomColor: "lightgray",
                    },
                    drawerLabelStyle: {
                      fontSize: 14,
                      color: "black",
                      fontFamily: Fonts.regular,
                      paddingVertical: 10,
                    },
                  }}
                />
              ))}
            </Drawer.Navigator>
          </NegotiationProvider>
        </NegotiationsProvider>
      </CarTypesProvider>
    </LocationProvider>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
