import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeImage from "../../../../assets/images/home.svg";
import Logout from "../../../../assets/images/logout.svg";
import Plus from "../../../../assets/images/plus.svg";
import Trash from "../../../../assets/images/trash.svg";
import UserImage from "../../../../assets/images/user.svg";
import { useUserContext } from "../../../context/UserContext";
import { storageService } from "../../../lib/storage.service";
import { Colors, FontSizes, Fonts, Spacing } from "../../../utils/styles";

const Profile = ({ navigation }) => {
  const { user, setUser } = useUserContext();

  const LogoutUser = async () => {
    try {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Logout",
            onPress: async () => {
              await storageService.clear();
              setUser(null);
              navigation.navigate("Login");
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <View style={styles.headerContainer}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Profile</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.infoContainer}>
          {user?.profile_picture ? (
            <Image src={user?.profile_picture} style={styles.user} />
          ) : (
            <UserImage width={70} height={70} />
          )}
          <Text style={styles.name}>
            {user?.firstname} {user?.lastname}
          </Text>
          <Text style={styles.email}>{user?.email || user?.phone}</Text>
          <View style={styles.ratingContainer}>
            <Image
              source={require("../../../../assets/images/star.png")}
              style={styles.star}
            />
            <Text style={styles.rating}>4.5</Text>
          </View>
        </View>
      </View>
      <View style={styles.savedPlacesContainer}>
        <Text style={styles.savedPlaces}>Saved places</Text>
        <View style={styles.savedPlacesList}>
          <HomeImage width={30} height={30} />
          <View style={styles.savedPlacesDetails}>
            <Text style={styles.savedPlacesName}>Home</Text>
            <Text style={styles.savedPlacesLocation}>
              Lekki palm city estate, Ajah. Lagos
            </Text>
          </View>
        </View>
        <View style={styles.savedPlacesList}>
          <HomeImage width={30} height={30} />
          <View style={styles.savedPlacesDetails}>
            <Text style={styles.savedPlacesName}>Work</Text>
            <Text style={styles.savedPlacesLocation}>
              Lekki palm city estate, Ajah. Lagos
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.savedPlacesList} activeOpacity={0.5}>
          <Plus width={25} height={25} />
          <View style={styles.savedPlacesDetails}>
            <Text style={[styles.savedPlacesName, { marginLeft: 6 }]}>
              Add Place
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.savedPlacesList, { marginTop: 0 }]}
          activeOpacity={0.5}
          onPress={LogoutUser}
        >
          <Logout width={30} height={30} />
          <View style={styles.savedPlacesDetails}>
            <Text style={styles.savedPlacesName}>Log out</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.savedPlacesList]} activeOpacity={0.5}>
          <Trash width={30} height={30} />
          <View style={styles.savedPlacesDetails}>
            <Text style={styles.savedPlacesName}>Delete account</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  backButton: {
    padding: Spacing.s,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  navContainer: {
    flex: 0.5,
    flexDirection: "row",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.l,
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  heading: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    flex: 0.5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bodyContainer: {
    height: 216,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoContainer: {
    alignItems: "center",
    padding: Spacing.l,
  },
  user: {
    width: 70,
    height: 70,
    borderRadius: 150 / 2,
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginTop: Spacing.m,
  },
  email: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    marginTop: Spacing.s,
    color: Colors.text_muted,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.s,
  },
  star: {
    width: 25,
    height: 25,
    marginRight: Spacing.s,
    objectFit: "contain",
  },
  rating: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  savedPlacesContainer: {
    padding: Spacing.l,
    backgroundColor: "#FFFFFF",
    marginTop: Spacing.l,
    borderRadius: 20,
  },
  savedPlaces: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  savedPlacesList: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.l,
  },
  savedPlacesDetails: {
    marginLeft: Spacing.m,
  },
  savedPlacesName: {
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
  savedPlacesLocation: {
    fontFamily: Fonts.regular,
    color: Colors.text_muted,
    marginTop: 4,
  },
  buttonContainer: {
    padding: Spacing.l,
    backgroundColor: "#FFFFFF",
    marginTop: Spacing.l,
    borderRadius: 20,
  },
});
