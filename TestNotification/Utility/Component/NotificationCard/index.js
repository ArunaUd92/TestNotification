import React, { useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './style';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default class App extends React.Component {

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.onPress && this.props.onPress()}>
        <Text style={styles.title} numberOfLines={2} >{this.props.NOTIFICATION.news_id || ""}</Text>
        <Text style={styles.subTitle} numberOfLines={2} >{this.props.NOTIFICATION.name || ""}</Text>
      </TouchableOpacity>
    );
  }
};

