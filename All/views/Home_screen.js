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
    },
    temperatureUnit: {
      fontSize: 40,
      fontWeight: "100",
      color: "gray",
      marginBottom: 12,
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
      alignItems: "center",
      padding: 10,
    },
    detailContainer: {
      width: "100%",
      height: windowWidthDetail * 2 + 10,
      justifyContent: "space-between",
      flexDirection: "column",
      marginBottom: 20,
    },
    detailRow: {
      width: "100%",
      height: 105,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    detailIcon: {
      width: 25,
      height: 25,
    },
    detailName: {
      marginTop: 5,
    },
    detailAbouts: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      marginTop: 5,
      alignItems: "center",
    },
    detailAbout: {
      fontSize: 30,
      color: "black",
      fontWeight:'400'
    },
    detailUnit: {
      fontSize: 18,
      fontWeight:'300',
      color: "grey",

    },
  });

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
          <View
            style={{
              flexDirection: "row",
              marginEnd: 15,
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.temperatureText}>40.7</Text>
            <Text style={styles.temperatureUnit}> °C</Text>
          </View>
          <Text
            style={{
              paddingBottom: 25,
              fontSize: 32,
              fontWeight: "100",
              color: "gray",
            }}
          >
            29.6°
          </Text>
          <Text style={styles.degreeText}>/</Text>
          <Text
            style={{
              paddingTop: 25,
              fontSize: 32,
              fontWeight: "100",
              color: "gray",
            }}
          >
            24.4°
          </Text>
        </View>
        {/* Ngày tháng năm hiện tại*/}
        <Text style={styles.dateText}>THURSDAY, SEPTEMBER 29, 2023</Text>
        {/* Địa điểm */}
        <Text style={styles.locationText}>Nam Tu Liem</Text>
        {/* Trạng thái thời tiết */}
        <Text style={styles.weatherStatusText}>Fair</Text>
        {/* Chi tiết */}
        <Text style={styles.detailHeaderText}>DETAIL</Text>
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            {/* Nhiệt độ cảm thấy */}
            <View style={styles.detailBox}>
              <Image
                style={styles.detailIcon}
                source={require("../image/feels_like.png")}
              />
              <Text style={styles.detailName}>Feels Like</Text>
              <View style={styles.detailAbouts}>
                <Text style={styles.detailAbout}>40.7</Text>
                <Text style={styles.detailUnit}> °C</Text>
              </View>
            </View>
            {/* Độ ẩm */}
            <View style={styles.detailBox}>
              <Image
                style={styles.detailIcon}
                source={require("../image/humidity.png")}
              />
              <Text style={styles.detailName}>Humidity</Text>
              <View style={styles.detailAbouts}>
                <Text style={styles.detailAbout}>59</Text>
                <Text style={styles.detailUnit}> %</Text>
              </View>
            </View>
            {/* Chỉ số tia UV */}
            <View style={styles.detailBox}>
              <Image
                style={styles.detailIcon}
                source={require("../image/uv_index.png")}
              />
              <Text style={styles.detailName}>UV Index</Text>
              <View style={styles.detailAbouts}>
                <Text style={styles.detailAbout}>5</Text>
              </View>
            </View>
          </View>
          {/* Tầm nhìn xa */}
          <View style={styles.detailRow}>
            <View style={styles.detailBox}>
              <Image
                style={styles.detailIcon}
                source={require("../image/visibility.png")}
              />
              <Text style={styles.detailName}>Visibility</Text>
              <View style={styles.detailAbouts}>
                <Text style={styles.detailAbout}>10</Text>
                <Text style={styles.detailUnit}> km</Text>
              </View>
            </View>
            {/* Tốc độ gió */}
            <View style={styles.detailBox}>
              <Image
                style={styles.detailIcon}
                source={require("../image/wind.png")}
              />
              <Text style={styles.detailName}>Speed Wind</Text>
              <View style={styles.detailAbouts}>
                <Text style={styles.detailAbout}>10.9</Text>
                <Text style={styles.detailUnit}> m/s</Text>
              </View>
            </View>
            {/* Áp suất */}
            <View style={styles.detailBox}>
              <Image
                style={styles.detailIcon}
                source={require("../image/pressure.png")}
              />
              <Text style={styles.detailName}>Pressure</Text>
              <View style={styles.detailAbouts}>
                <Text style={styles.detailAbout}>1008</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home_screen;
