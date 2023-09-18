import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const LoginScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.Text}>
                hoàng t
            </Text>


        </View>

    )

}

export default LoginScreen;


const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 40, 0, 0.5)',
    }

});