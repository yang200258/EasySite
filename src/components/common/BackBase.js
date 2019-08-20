import React from "react";
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";

class BackBase extends React.Component {
    constructor(props) {
        super(props)
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);
    }
    componentDidMount() {
        if (this.props.backPress) BackHandler.addEventListener("hardwareBackPress", this._hardwareBackPress);
    }
  
    componentWillUnmount() {
        if (this.props.backPress) BackHandler.removeEventListener("hardwareBackPress", this._hardwareBackPress);
    }
  
    onHardwareBackPress = (e) => {
        return this.props.backPress(e);
    };
  }

  export default BackBase