import React, { Component } from 'react';
import { Text, View,Image,DeviceEventEmitter } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import Colors from '../../utils/Colors';
class WorkBench extends Component {
    
    render() {
        let navigationBar = <NavigationBar title={'工作台'} />
        return (
            <View>
                {navigationBar}
                <Text>Hello, workBench!</Text>
            </View>
        )
    }
}

export default WorkBench