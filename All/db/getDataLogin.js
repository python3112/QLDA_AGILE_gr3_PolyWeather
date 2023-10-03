import { StyleSheet, Text, View } from 'react-native'
import React ,{} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const getDataLogin = () => {
   
        AsyncStorage.getItem('Data_User', (error, result) => {
          if (!error) {
            const user = JSON.parse(result)
           
            console.log('user from header DrawNav : ' + result + ' ');
            return user;
          } else {
            console.log('error from header DrawNav: ' + error);
          }
        });
   
    }

export default getDataLogin

