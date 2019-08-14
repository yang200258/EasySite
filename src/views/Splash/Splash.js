import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,Platform,Dimensions } from 'react-native';
import Colors from '../../utils/Colors'
const imageBg = require('../../assets/image/splash.png');

// iPhoneX 
const X_WIDTH = 375; 
const X_HEIGHT = 812; 

// screen 
const SCREEN_WIDTH = Dimensions.get('window').width; 
const SCREEN_HEIGHT = Dimensions.get('window').height; 

let isIphoneX = () => { 
    return ( 
        Platform.OS === 'ios' &&  
        ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||  
        (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT)) 
    ) 
}

class Splash extends Component {
     

    count = 3;
    componentDidMount() {
        this.task = setInterval(() => {
            if (this.count == 0) {
                this.props.navigation.replace('Tab')
                clearInterval(this.task)
            } else {
                this.count--;
                this.forceUpdate()
            }
        }, 1000);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={imageBg}
                    resizeMode='cover'
                    style={{ flex: 1, width: SCREEN_WIDTH }}></Image>
                <View style={styles.buttonStyle}>
                    <Text style={{color:'#000',fontSize:15}}>{this.count}s</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute',
        top: 10 + isIphoneX ? 45 : 0,
        right: 15,
        // borderWidth: 1,
        // borderColor: Colors.mainColor,
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius: 5,
        paddingHorizontal:20,
        paddingVertical:5,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Splash