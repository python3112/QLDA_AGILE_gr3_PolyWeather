import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React , {useEffect , useState} from 'react'
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home_screen = (props) => {
  const { navigation } = props;

 useEffect(() => {
  AsyncStorage.getItem('Data_User', (error, result) => {
    if (!error) {
     const user = JSON.parse(result)
    
      console.log('Giá trị đã lưu: ' + result + ' '  );
    } else {
      console.log('Lỗi khi đọc giá trị: ' + error);
    }
  });
 }, [])
 

  return (
    <View style={styles.container}>
      <Image source={require("../image/anhHome.jpg")} style={{ width: "100%", height: 300, borderRadius: 10, marginTop: 10 }} />
      <View style={styles.btnDetails}>
        <Text style={{ fontSize: 40, color: 'gray' }}>16°C</Text>
        <Text style={{ color: 'gray', fontSize: 24 }}>18.4°/15°</Text>
      </View>

      <Text style={{ fontSize: 24 }}>Hà Giang</Text>
      <Text>Clear shy</Text>
      <Text>Details</Text>
      <View style={styles.btnDetails}>
        <TouchableOpacity style={styles.btn}>
          <Image style={{ width: 30, height: 30 }} source={require("../image/temperature.png")} />
          <Text>Feels like</Text>
          <View style={styles.btnDetails}>
            <Text style={styles.txtDetail}>16</Text>
            <Text style={styles.textD}>°C</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image style={{ width: 30, height: 30 }} source={require("../image/humidity.png")} />
          <Text>Humidity</Text>
          <View style={styles.btnDetails}>
            <Text style={styles.txtDetail}>59</Text>
            <Text style={styles.textD}>%</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image style={{ width: 30, height: 30 }} source={require("../image/rays.png")} />
          <Text>Chỉ số UV</Text>
          <View style={styles.btnDetails}>
            <Text style={styles.txtDetail}>1</Text>
          </View>

        </TouchableOpacity>
      </View>
      <View style={styles.btnDetails}>
        <TouchableOpacity style={styles.btn}>
          <Image style={{ width: 30, height: 30 }} source={require("../image/view.png")} />
          <Text>Visibility</Text>
          <View style={styles.btnDetails}>
            <Text style={styles.txtDetail}>10</Text>
            <Text style={styles.textD}>Km</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image style={{ width: 30, height: 30 }} source={require("../image/wind.png")} />
          <Text>Wind speed</Text>

          <View style={styles.btnDetails}>
            <Text style={styles.txtDetail}>10</Text>
            <Text style={styles.textD}> Km/s</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image style={{ width: 30, height: 30 }} source={require("../image/blood-pressure.png")} />
          <Text>Pressure</Text>
          <View style={styles.btnDetails}>
            <Text style={styles.txtDetail}>1015</Text>
          </View>

        </TouchableOpacity>
      </View>



    </View>
  )
}

export default Home_screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  btn: {
    width: 120,
    height: 120,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10
  },
  btnDetails: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,

  },
  txtDetail: {
    fontSize: 20
  },
  textD: {
    fontSize: 20,
    color: 'gray',
    marginLeft: 5
  }


})