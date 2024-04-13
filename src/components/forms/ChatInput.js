import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Spacing } from "../../utils/styles";

const ChatInput = ({ sendMessage, message, setMessage }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput placeholder="Write a reply..." style={styles.input} value={message} onChangeText={setMessage} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.sendButton}
        onPress={sendMessage}
      >
        <Feather name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  inputContainer: {
    padding: Spacing.m,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  sendButton: {
    backgroundColor: Colors.accent,
    padding: Spacing.m,
    borderRadius: 50,
    marginLeft: Spacing.s,
  },
  input: {
    flex: 1,
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    fontFamily: Fonts.dm_sans,
  },
});
