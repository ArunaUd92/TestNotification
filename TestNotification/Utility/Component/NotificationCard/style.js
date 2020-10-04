import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({

  container: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: wp("3%"),
    flexDirection: "column",
    borderRadius: 5   
  },

  title: {
    fontSize: 20,
    color: "#000000",
  },

  subTitle: {
    fontSize: 16,
    color: "#505050",
  }

});