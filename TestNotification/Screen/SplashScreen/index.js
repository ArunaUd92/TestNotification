import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import firebase from 'react-native-firebase';

import styles from './style';

import { resetStackWithPassingData } from '../../Action/navigateCtrl';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pushNotificationData: "",
    };
  }

  componentDidMount() {

    this.createNotificationChannel();
    this.checkPermission();
    this.createNotificationListeners();

  }

  componentWillUnmount() {

  }

  checkPermission = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.subscribeToTopic();
      } else {
        this.requestPermission();
      }
    } catch (error) {
      console.log("Check permission error :", error);

    }
  }

  subscribeToTopic = async () => {
    try {
      const enabled = firebase.messaging().subscribeToTopic("global");
    } catch (error) {
      console.log("Subscribe to topic error :", error);
    }
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission().then(() => {
        this.subscribeToTopic();
      });
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      console.log("User has rejected permissions :", error);
    }
  }

  createNotificationChannel = () => {
    // Build a android notification channel
    const channel = new firebase.notifications.Android.Channel(
      "testnotification", // channelId
      "Test Notification", // channel name
      firebase.notifications.Android.Importance.High // channel importance
    ).setDescription("Used for getting notification"); // channel description
    // Create the android notification channel
    firebase.notifications().android.createChannel(channel);
  };

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        if (Platform.OS === 'android') {
          const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setAutoCancel(true)
            .android.setChannelId('testnotification')
            .android.setSmallIcon('@mipmap/ic_launcher_round')
            .android.setColor('#000000') // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);

          firebase
            .notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        } else if (Platform.OS === 'ios') {
          const localNotification = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .setSound("default")
            .ios.setBadge(notification.ios.badge);

          firebase
            .notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        }
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body, data } = notificationOpen.notification;
        this.setState({ pushNotificationData: data })
        this.navigateNextScreen();
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      this.setState({ pushNotificationData: data });
      this.navigateNextScreen();

    } else {
      this.navigateNextScreen();

    }
  }

  navigateNextScreen() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.navigation.dispatch(resetStackWithPassingData("NotificationScreen", this.state.pushNotificationData))
    }, 1000);
  }

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>Notifications</Text>
        </View>
    );
  }
}

export default App;