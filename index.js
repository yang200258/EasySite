/**
 * @format
 */
import React,{ Component } from 'react'
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import Store from './src/utils/ConfigRedux';
import {name as appName} from './app.json';
class Root extends Component {
    render() {
        return (
            <Provider store={Store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => Root)
