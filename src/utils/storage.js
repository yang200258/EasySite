import AsyncStorage from '@react-native-community/async-storage';
import React,{Component} from 'react';
import {Alert} from 'react-native';




export default class StorageUtil extends Component {
    static async save(key,value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
            return true
        } catch (e) {
            console.log(e);
            Alert.alert(
                '异常',
                `save:${key}异常,${e}`,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            return false
        }
    }
    static async get(key) {
        try {
            let val = await AsyncStorage.getItem(key)
            return JSON.parse(val)
        } catch (e) {
            // console.log(e)
            return false
        }
    }
    static async update(key,value) {
        try {
            await AsyncStorage.mergeItem(key,JSON.stringify(value))
            return true
        } catch (e) {
            console.log(e);
            Alert.alert(
                '异常',
                `update:${key}异常,${e}`,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            return false
        }
    }
    static async remove(key) {
        try {
            await AsyncStorage.removeItem(key)
            return true
        } catch (e) {
            console.log(e);
            Alert.alert(
                '异常',
                `remove:${key}异常,${e}`,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            return false
        }
    }
    static async clear() {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log(e);
            Alert.alert(
                '异常',
                `clear:异常,${e}`,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
    }
}