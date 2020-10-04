import React from 'react';
import {
   StyleSheet,
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({

   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF"
   },

   centerContainer: {
      flex: 1,
   },

   list: {
      flex: 1,
      width: wp('100%'),
   },

   listSeparator: {
      height: 1, 
      width: '100%', 
      backgroundColor: '#CED0CE'
   },

});