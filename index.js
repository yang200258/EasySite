/**
 * @format
 */
import React,{ Component } from 'react'
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import Store from './src/utils/ConfigRedux';
import {name as appName} from './app.json';
// import { YellowBox } from 'react-native';
// import codePush from "react-native-code-push";
// YellowBox.ignoreWarnings([
//     'Warning: componentWillMount is deprecated',
//     'Warning: componentWillUpdate is deprecated',
//     'Warning: componentWillReceiveProps is deprecated',
// ]);
class Root extends Component {
    render() {
        return (
            <Provider store={Store}>
                <App />
            </Provider>
        )
    }
}
// Root = codePush(Root);
AppRegistry.registerComponent(appName, () => Root)
