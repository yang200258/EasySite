import React, { Component } from 'react';
import { Text, View,Image,DeviceEventEmitter } from 'react-native';
import { Button  } from 'react-native-paper';
import StorageUtil from '../../utils/storage';
import NavigationUtil from '../../navigator/NavigationUtil';
class Mine extends Component {
    exitLogin = () => {
        StorageUtil.remove('loginToken')
        NavigationUtil.go('Login')
    }
    render() {
        return (
            <View style={{backgroundColor: '#eee',flex:1,marginTop: 30}}>
                <Button mode='text' style={{backgroundColor: '#fff'}} color='#000' onPress={() => this.exitLogin()}>
                    退出登录
                </Button>
            </View>
        )
    }
}

export default Mine