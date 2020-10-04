import React from 'react';
import {
    Image,
} from 'react-native';

import { StackActions, NavigationActions, createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from "../Screen/SplashScreen";
import Notification from "../Screen/NotificationScreen";

const MainNavigator = createStackNavigator(
    {
        SplashScreen: { screen: Splash },
        NotificationScreen: { screen: Notification,  params:{PUSH_NOTIFI_DATA: ""} },

    },
    {
        initialRouteName: "SplashScreen",
        headerMode: "none",
        defaultNavigationOptions: {
            headerVisible: false,
        },
    }
);

const App = createAppContainer(MainNavigator);

export default App;