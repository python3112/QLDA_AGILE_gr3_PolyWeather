import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VIPDepositScreen = () => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <Image style={{ width: 100, height: 100, borderRadius: 50, }} source={require('./All/image/snowy.jpg')}>

        </Image>
      </View>
      <View style={styles.viewBody}>

      </View>

    </View>
  )
}

export default VIPDepositScreen

const styles = StyleSheet.create({})