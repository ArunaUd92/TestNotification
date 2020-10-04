import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import style from "./style"

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            supplierSelector: false,
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.title} numberOfLines={1}>Notification</Text>
            </View>
        );
    }
}

export default App;