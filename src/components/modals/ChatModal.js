import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatInput from "../../components/forms/ChatInput";
import { Colors, FontSizes, Fonts, Spacing } from "../../utils/styles";

const ChatModal = ({ bottomSheetRef5, bottomSheetRef4, negotiation }) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello, I'm interested in your car",
      time: "12:00 PM",
      type: "received",
    },
    {
      id: 2,
      message: "Which car are you interested in?",
      time: "12:01 PM",
      type: "sent",
    },
    {
      id: 3,
      message: "The Toyota Corolla",
      time: "12:02 PM",
      type: "received",
    },
  ]);

  const chatContainer = useRef(null);

  const sendMessage = () => {
    if (message) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          message,
          time: Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(new Date()),
          type: "sent",
        },
      ]);
      setMessage("");
      chatContainer.current.scrollToEnd();
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef5}
      index={0}
      snapPoints={["100%"]}
      enablePanDownToClose={false}
      handleComponent={() => null}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor="white" />
        <View style={styles.header}>
          <TouchableOpacity
            // go back to previous screen
            onPress={() => {
              bottomSheetRef5.current.dismiss();
              bottomSheetRef4.current.present();
            }}
            activeOpacity={0.8}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <View style={styles.profileImage}>
              <Image
                source={
                  negotiation?.driver?.profile_picture
                    ? { uri: negotiation?.driver?.profile_picture }
                    : require("../../../assets/images/avatar2.png")
                }
                alt="placeholder"
                style={styles.image}
              />
              <View style={styles.onlineDot}></View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>
                {(negotiation?.driver?.firstname || "John") +
                  " " +
                  (negotiation?.driver?.lastname || "Doe")}
              </Text>
              <Text style={styles.carType}>Toyota Corolla</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.chatContainer} ref={chatContainer}>
          {messages.map((msg, index) => (
            <View key={index}>
              {msg.type === "received" ? (
                <View>
                  <Text style={styles.receivedText}>{msg.message}</Text>
                  <Text style={styles.receivedTime}>{msg.time}</Text>
                </View>
              ) : (
                <View style={styles.sentMessage}>
                  <Text style={styles.sentText}>{msg.message}</Text>
                  <Text style={styles.sentTime}>{msg.time}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        <ChatInput
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
        />
      </SafeAreaView>
    </BottomSheetModal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    gap: Spacing.l,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  onlineDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "green",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "white",
  },
  profileInfo: {
    marginLeft: Spacing.s,
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.m,
  },
  carType: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
  },
  chatContainer: {
    flex: 1,
    padding: Spacing.m,
  },
  receivedText: {
    fontFamily: Fonts.dm_sans_semibold,
    padding: Spacing.m,
    backgroundColor: Colors.accent_light,
    maxWidth: "70%",
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    alignSelf: "flex-start",
    margin: Spacing.s,
  },
  receivedTime: {
    fontFamily: Fonts.dm_sans,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
    marginLeft: Spacing.s,
  },
  sentMessage: {
    alignSelf: "flex-end",
  },
  sentText: {
    fontFamily: Fonts.dm_sans_semibold,
    padding: Spacing.m,
    backgroundColor: Colors.accent,
    maxWidth: "70%",
    borderRadius: 15,
    borderBottomRightRadius: 0,
    alignSelf: "flex-end",
    margin: Spacing.s,
    color: "white",
  },
  sentTime: {
    fontFamily: Fonts.dm_sans,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
    marginRight: Spacing.s,
    textAlign: "right",
  },
});
