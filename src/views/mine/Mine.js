import React, { Component } from 'react';
import { Text, View,Image,DeviceEventEmitter } from 'react-native';
import { Button  } from 'react-native-paper';
import StorageUtil from '../../utils/storage'
class Mine extends Component {
    exitLogin = () => {
        StorageUtil.remove('loginToken')
        this.props.navigation.navigate('Login')
    }
    render() {
        return (
            <View>
                <Button mode='text' style={{marginTop: 40}} onPress={() => this.exitLogin()}>
                    退出登录
                </Button>
            </View>
        )
    }
}

export default Mine