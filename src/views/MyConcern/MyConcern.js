import React, { Component } from 'react';
import { Text, View } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import Colors from '../../utils/Colors';

class MyConsern extends Component {
    render() {
        let navigationBar = <NavigationBar title={'我的关注'} />
        return (
            <View>
                {navigationBar}
                <Text>Hello, MyConsern!</Text>
            </View>
        )
    }
}

export default MyConsern