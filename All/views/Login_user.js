import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text  ,Image} from "react-native";

const LoginScreen = (props) => {
    return (
        <View style={styles.container}>
            <Image style={{width:100, height:100}} source={require('../image/logoCloud.png')}/>

           
            <Text style={styles.Text}>
               Poly Weather
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
     
       
    }

});