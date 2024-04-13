import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserImage from "../../../assets/images/user.svg";
import { useUserContext } from "../../context/UserContext";
import { Colors, FontSizes, Fonts } from "../../utils/styles";

const CustomDrawerContent = (props) => {
  const { user } = useUserContext();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            {user?.profile_picture ? (
              <Image src={user?.profile_picture} style={styles.avatar} />
            ) : (
              <UserImage style={styles.avatar} />
            )}
            <View style={styles.profileDetails}>
              <Text style={styles.username}>
                {(user?.firstname + " " + user?.lastname).length > 10
                  ? (user?.firstname + " " + user?.lastname).substring(0, 10) +
                    "..."
                  : user?.firstname + " " + user?.lastname}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate("Profile")}
              >
                <Text style={styles.subText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Image
              source={require("../../../assets/images/star.png")}
              style={styles.star}
            />
            <Text style={styles.rating}>4.5</Text>
          </View>
        </View>
        <View style={styles.drawerItems}>
          {props.navigationsArray.map((navigation, index) => (
            <DrawerItem
              key={index}
              label={navigation.name}
              style={[
                styles.drawerItem,
                {
                  // display: navigation.display ? navigation.display : false,
                  display: navigation.display ? "flex" : "none",
                },
              ]}
              labelStyle={{
                fontFamily: Fonts.medium,
                color: "#333333",
              }}
              icon={() => navigation.icon}
              onPress={() => props.navigation.navigate(navigation.name)}
            />
          ))}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: 10,
  },
  username: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.bold,
  },
  subText: {
    fontSize: FontSizes.s,
    fontFamily: Fonts.regular,
    color: Colors.text_muted,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    width: 25,
    height: 25,
  },
  rating: {
    fontSize: FontSizes.m,
    fontFamily: Fonts.bold,
    marginLeft: 5,
  },
  drawerItems: {
    marginTop: 5,
  },
  drawerItem: {
    padding: 10,
    marginHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    fontFamily: Fonts.regular,
  },
});
