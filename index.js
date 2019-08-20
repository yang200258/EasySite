/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import { YellowBox } from 'react-native';
// import codePush from "react-native-code-push";
// YellowBox.ignoreWarnings([
//     'Warning: componentWillMount is deprecated',
//     'Warning: componentWillUpdate is deprecated',
//     'Warning: componentWillReceiveProps is deprecated',
// ]);
// Root = codePush(Root);
AppRegistry.registerComponent(appName, () => App)
