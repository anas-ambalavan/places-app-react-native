import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetailsScreen = () => {
  return (
    <View>
      <Text>PlaceDetailCSre</Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({});
