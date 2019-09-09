import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {Button} from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class AboutUs extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button info iconRight>
                    <Text>检查更新</Text>
                    <AntDesign name='right' />
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    
})
