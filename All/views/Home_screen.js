import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import "react-native-dimension";


const Home_screen = (props) => {
  const { navigation } = props;
  const windowWidth = Dimensions.get("window").width * 0.92;
  const windowWidthDetail = Dimensions.get("window").width * 0.282;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      width: "100%",
    },
    weatherImage: {
      alignSelf: "center",
      width: windowWidth,
      height: windowWidth,
      borderRadius: 10,
    },
    temperatureContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
    },
    temperatureText: {
      fontSize: 68,
      fontWeight: "100",
      color: "gray",
      marginEnd: 20,
    },
    degreeText: {
      fontSize: 32,
      fontWeight: "100",
      color: "gray",
    },
    dateText: {
      color: "gray",
    },
    locationText: {
      color: "black",
      fontSize: 28,
      fontWeight: "bold",
      marginVertical: 5,
    },
    weatherStatusText: {
      color: "black",
      fontSize: 16,
    },
    detailHeaderText: {
      color: "black",
      fontSize: 15,
      marginTop: 15,
      fontWeight: "500",
      marginBottom: 25,
    },
    detailBox: {
      backgroundColor: "#EEEEEE",
      borderRadius: 5,
      width: windowWidthDetail,
      height: windowWidthDetail,
    },
  });

  const renderDetail = () => {
    const renderBox = () => {
      return <View style={styles.detailBox}></View>;
    };

    return (
      <View
        style={{
          width: "100%",
          height: windowWidthDetail * 2 + 10,
          justifyContent: "space-between",
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 105,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {renderBox()}
          {renderBox()}
          {renderBox()}
        </View>
        <View
          style={{
            width: "100%",
            height: 105,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {renderBox()}
          {renderBox()}
          {renderBox()}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", paddingHorizontal: 16 }}>
        {/* Ảnh thời tiết */}
        <Image
          style={styles.weatherImage}
          source={require("../image/cloudy.jpg")}
        />
        {/* Nhiệt độ */}
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>26°C</Text>
          <Text style={styles.degreeText}>29°</Text>
          <Text style={styles.degreeText}>/</Text>
          <Text style={styles.degreeText}>24°</Text>
        </View>
        {/* Ngày tháng năm hiện tại*/}
        <Text style={styles.dateText}>THURSDAY, SEPTEMBER 29, 2023</Text>
        {/* Địa điểm */}
        <Text style={styles.locationText}>Nam Tu Liem</Text>
        {/* Trạng thái thời tiết */}
        <Text style={styles.weatherStatusText}>Fair</Text>
        {/* Chi tiết */}
        <Text style={styles.detailHeaderText}>DETAIL</Text>
        {renderDetail()}
      </ScrollView>
    </View>
  );
};

export default Home_screen;
