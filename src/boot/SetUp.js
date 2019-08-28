import React, { Component } from "react";
import { StyleProvider } from "native-base";

import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

import AppNavigator from '../navigator/stackNavigator';


class SetUp extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
            <AppNavigator />
      </StyleProvider>
    );
  }
}


export default SetUp
