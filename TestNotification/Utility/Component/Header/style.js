import React from 'react';
import {
   StyleSheet,
   Platform
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MAIN_COLOR } from "../../Colors";

export default styles = StyleSheet.create({
   
    container: {
      width: wp("100%"),
      height: Platform.select({ ios: 44, android: 54 }),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: MAIN_COLOR.THEME_COLOR,
    },

   title: {
      fontSize: 18,
      color: "#FFFFFF",
     },

});
