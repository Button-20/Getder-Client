import { StyleSheet, View } from "react-native";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import FareInput from "../forms/FareInput";

const EditFare = ({ bottomSheetRef2, request, setRequest }) => {
  return (
    <BottomSheetModal
      ref={bottomSheetRef2}
      index={0}
      snapPoints={["40%"]}
      enablePanDownToClose={false}
      containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <View style={styles.contentContainer}>
        <FareInput
          request={request}
          setRequest={setRequest}
          bottomSheetRef2={bottomSheetRef2}
        />
      </View>
    </BottomSheetModal>
  );
};

export default EditFare;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
