import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native'

const Splash_screen = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('login'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('../image/logo.png')} />
      <Text style={styles.textLogo}>POLY WEATHER</Text>
    </SafeAreaView>
  );
}

export default Splash_screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  textLogo:{
    marginTop:10,
    color:'black',
    fontWeight:'300',
    fontSize: 24
  }
})