import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

class ClockDetailTag extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.tagContainer}>
                <Text style={styles.leftTagContainer}>{this.props.data.state}</Text>
                <View style={styles.rightTagContainer}>
                    <Text style={styles.rightText}>{this.props.data.time}</Text>
                    <Text style={styles.rightText}>{this.props.data.address}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tagContainer: {
        height: 70,
        marginLeft: 20,
        marginRight: 70,
        backgroundColor: Colors.mainColor,
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },  
    leftTagContainer: {
        lineHeight: 70,
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
    },
    rightTagContainer:{
        justifyContent: 'center',
    },
    rightText: {
        color: '#fff',
        fontSize: 16,
    }
})

export default ClockDetailTag;