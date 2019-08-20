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

// import RootNav from './src/navigator/tabNavigator';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}

