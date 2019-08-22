/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React,{Component} from 'react';
// import {Text,Image} from 'react-native';
import store from './src/store/index';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigator/stackNavigator';

import CodePush from "react-native-code-push";

class App extends Component {
    // componentDidMount() {
    //     CodePush.sync(
    //         { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
    //         );
    // }
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}

export default CodePush({ checkFrequency: CodePush.CheckFrequency.MANUAL })(App)

