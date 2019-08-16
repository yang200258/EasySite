/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React,{Component} from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import RootNav from './src/navigator/stackNavigator';

// import RootNav from './src/navigator/tabNavigator';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootNav /> 
           </Provider>
        )
    }
}

