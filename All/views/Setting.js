import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

const Setting = () => {
  const [dataUserSetting, setdataUserSetting] = useState({});
  const [visibleModelPass, setvisibleModelPass] = useState(false);
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <Image style={{ width: 70, height: 70, borderRadius: 50, }} source={require('../image/snowy.jpg')} />

          <Text style={{ margin: 10, fontSize: 20 }}>
            vu huy hoang
          </Text>
        </View>

        <Text style={{ opacity: 0.5, fontSize: 20, }}>
          #haiphong
        </Text>


      </View>
      <View style={styles.viewBody}>

        <View style={{
          width: "100%",
          backgroundColor: 'black',
          flexDirection: 'column',
          marginTop: 50,
          backgroundColor: 'red'
        }}>
          <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'red'
          }}>
            <TouchableOpacity style={{ width: '45%', height: 70, justifyContent: 'center' }}>
              <Text>
                onPress
              </Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>

    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewHeader: {
    width: '90%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
})