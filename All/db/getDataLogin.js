import { StyleSheet, Text, View } from 'react-native'
import React ,{} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const getDataLogin = async(namePage) => {
   
       await AsyncStorage.getItem('Data_User', (error, result) => {
          if (!error) {
            const user = JSON.parse(result)
            console.log('user from header DrawNav '+ namePage + ':'  + result + ' ');
            return user;
          } else {
            console.log('error from header DrawNav: ' + error);
            return null;
          }
        });



        try {
          
        } catch (error) {
          
        }
   
    }

export default getDataLogin

