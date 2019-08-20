import React from "react";
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";

class BackBase extends React.Component {
    componentDidMount() {
      BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
  
    onBackPress = () => {
      const { dispatch, nav } = this.props;
      if (nav.index === 0) {
        return false;
      }
  
      dispatch(NavigationActions.back());
      return true;
    };
  }