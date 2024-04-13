import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BorderRadii, Colors, Fonts, Spacing } from "../../utils/styles";

const RideOfferCard = ({ offer, updateOffer }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.offerContainer}>
      <View style={styles.countDown}></View>
      <View style={styles.offerDetailContainer}>
        <Image src={offer?.driver?.profile_picture} style={styles.avatar} />
        <View>
          <View style={styles.row}>
            <Text style={styles.headerText}>
              {offer.driver
                ? offer.driver?.firstname + " " + offer.driver?.lastname
                : "Not Available"}
            </Text>
            <Text style={styles.headerText}>
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: offer.currency?.code,
              }).format(offer.price)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subText}>
              {offer?.driver?.vehicle?.brand +
                " " +
                offer?.driver?.vehicle?.model}
            </Text>
            <Text style={styles.subText}>15 mins</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subText}>
              <Image
                source={require("../../../assets/images/star.png")}
                style={styles.star}
              />
              <Text style={[styles.headerText, { color: Colors.primary }]}>
                4.5
              </Text>{" "}
              (124)
            </Text>
            <Text style={styles.subText}>2.4km</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.declineBtn}
          onPress={async () =>
            await updateOffer({ negotiation_id: offer._id, status: "rejected" })
          }
        >
          <Text style={styles.declineBtnText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.acceptBtn}
          onPress={async () => {
            setLoading(true);
            await updateOffer({
              negotiation_id: offer._id,
              status: "accepted",
            });
            setLoading(false);
          }}
        >
          <Text style={styles.acceptBtnText}>
            {loading && <ActivityIndicator color={Colors.white} />}
            {!loading && "Accept"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOfferCard;

const styles = StyleSheet.create({
  offerContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  offerDetailContainer: {
    flexDirection: "row",
    gap: Spacing.m,
    padding: Spacing.m,
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  btnContainer: {
    flexDirection: "row",
    gap: Spacing.s,
    alignItems: "center",
    paddingVertical: Spacing.m,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  declineBtn: {
    width: "45%",
    alignItems: "center",
  },
  declineBtnText: {
    color: Colors.text_danger,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  acceptBtn: {
    width: "45%",
    backgroundColor: Colors.accent,
    alignItems: "center",
    paddingHorizontal: Spacing.l,
    paddingVertical: Spacing.m,
    borderRadius: BorderRadii.l,
  },
  acceptBtnText: {
    color: "white",
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    marginBottom: Spacing.s,
  },
  headerText: {
    fontFamily: Fonts.bold,
  },
  subText: {
    fontFamily: Fonts.regular,
    color: Colors.text_muted,
  },
  star: {
    width: 15,
    height: 15,
    objectFit: "contain",
  },
  countDown: {
    height: 5,
    backgroundColor: Colors.accent,
    width: "100%",
  },
});
