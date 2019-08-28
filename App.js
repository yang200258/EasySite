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
// import AppNavigator from './src/navigator/stackNavigator';
import SetUp from './src/boot/SetUp.js'
import CodePush from "react-native-code-push";


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <SetUp />
            </Provider>
        )
    }
}

let options = { checkFrequency: CodePush.CheckFrequency.MANUAL }

export default App
// export default CodePush(App)

