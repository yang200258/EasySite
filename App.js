/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React,{Component} from 'react';
// import {Text,Image} from 'react-native';

import RootNav from './src/navigator/stackNavigator';

// import RootNav from './src/navigator/tabNavigator';

export default class App extends Component {
    render() {
        return (
           <RootNav /> 
        )
    }
}

