import React from 'react';
import {
   StyleSheet,
} from 'react-native';

import { BACKGROUND_COLOR } from '../../Utility/Colors';

export default styles = StyleSheet.create({

   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: BACKGROUND_COLOR
   },

   logoText: {
      fontSize: 20,
      color: "#000000",
   }

});
