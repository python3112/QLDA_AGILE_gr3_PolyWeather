import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import "react-native-gesture-handler";
import moment from "moment";
import { fetchWeatherForecast } from "../db/apiWeather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles } from "../css/styleHome";

const Home_screen = (props) => {
  const { navigation } = props;
  const [searchAddress, setSearchAddress] = useState("hanoi");
  const [weatherDataForecast, setWeatherDataForecast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [srcImage, setSrcImage] = useState(require("../image/cloudy.jpg"));

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Mở đóng modal
  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setIsVisible(false);
  };
  // Lấy ngày
  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("dddd, MMMM D, YYYY")
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(moment().format("dddd, MMMM D, YYYY"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  // Lấy dữ liệu từ api
  useEffect(() => {
    fetchWeatherForecast(searchAddress)
      .then((data) => {
        setWeatherDataForecast(data);
      })
      .catch((error) => {
        console.error("Error fetching weather forecast data:", error);
      });
  }, []);
  // Tìm kiếm
  const searchWeather = () => {
    if (searchAddress.trim() === "") {
      return;
    }
    fetchWeatherForecast(searchAddress)
      .then((data) => {
        setWeatherDataForecast(data);
      })
      .catch((error) => {
        openModal();
      });
  };
  // Dự báo
  // Thay đổi ảnh theo tình trạng thời tiết
  useEffect(() => {
    if (weatherDataForecast) {
      const conditionText =
        weatherDataForecast.current["condition"]["text"].toLowerCase();
      let imagePath = "";

      switch (conditionText) {
        // Ít mây
        case "partly cloudy":
          imagePath = require("../image/partly_cloudy.jpg");
          break;
        case "clear":
          imagePath = require("../image/clear.jpg");
          break;
        // Sương mù
        case "mist":
          imagePath = require("../image/mist.jpg");
          break;
        // Âm u overcast
        case "overcast":
          imagePath = require("../image/overcast.jpg");
          break;
        // Mưa rải rác Moderate rain
        case "patchy rain possible":
        case "moderate rain":
        case "light rain":
          imagePath = require("../image/rainy.jpg");
          break;
        // Mưa và sấm sét
        case "patchy light rain with thunder":
          imagePath = require("../image/rain_with_thunder.jpg");
          break;
        // Nắng
        case "sunny":
          imagePath = require("../image/sunny.jpg");
          break;

        default:
          imagePath = require("../image/cloudy.jpg");
          break;
      }

      // Đặt đường dẫn ảnh
      setSrcImage(imagePath);
    }
  }, [weatherDataForecast]);

  return (
    <View style={styles.container}>
      {/* Thông báo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.containerModal}>
          <View style={styles.viewModal}>
            <View style={styles.headerModal}>
              <FontAwesome5
                name="exclamation-triangle"
                size={30}
                color="white"
                style={{ marginStart: 10 }}
              />
              <Text style={styles.textHeaderModal}>Error</Text>
            </View>
            <View style={styles.bodyModal}>
              <Text style={{ fontSize: 16 }}>Address not found!</Text>
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.btnModal}>
              <Text style={{ textAlign: "center" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Kiểm tra dữ liệu */}
      {weatherDataForecast !== null ? (
        <>
          <ScrollView style={{ width: "100%", paddingHorizontal: 16 }}>
            {/* Tìm kiếm */}
            <View style={styles.containerSearch}>
              <TextInput
                style={styles.tipSearch}
                placeholder="Enter Address"
                value={searchAddress}
                onChangeText={(text) => setSearchAddress(text)}
              />
              <TouchableOpacity
                style={styles.btnSearch}
                onPress={searchWeather}
              >
                <Text style={styles.textSearch}>Search</Text>
              </TouchableOpacity>
            </View>
            {/* Ảnh thời tiết */}
            <Image style={styles.weatherImage} source={srcImage} />
            {/* Nhiệt độ */}
            <View style={styles.temperatureContainer}>
              <View style={styles.temperatureDetails}>
                <Text style={styles.temperatureText}>
                  {weatherDataForecast.current["temp_c"]}
                </Text>
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
                {weatherDataForecast["forecast"]["forecastday"]["0"]["day"][
                  "maxtemp_c"
                ] + "°"}
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
                {weatherDataForecast["forecast"]["forecastday"]["0"]["day"][
                  "mintemp_c"
                ] + "°"}
              </Text>
            </View>
            {/* Ngày tháng năm hiện tại*/}
            <Text style={styles.dateText}>{currentDateTime}</Text>
            {/* Địa điểm */}
            <Text style={styles.locationText}>
              {weatherDataForecast.location["name"]}
            </Text>
            {/* Trạng thái thời tiết */}
            <Text style={styles.weatherStatusText}>
              {weatherDataForecast.current["condition"]["text"]}
            </Text>
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
                    <Text style={styles.detailValue}>
                      {weatherDataForecast.current["feelslike_c"]}
                    </Text>
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
                    <Text style={styles.detailValue}>
                      {weatherDataForecast.current["humidity"]}
                    </Text>
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
                    <Text style={styles.detailValue}>
                      {weatherDataForecast.current["uv"]}
                    </Text>
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
                    <Text style={styles.detailValue}>
                      {weatherDataForecast.current["vis_km"]}
                    </Text>
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
                    <Text style={styles.detailValue}>
                      {weatherDataForecast.current["wind_kph"]}
                    </Text>
                    <Text style={styles.detailUnit}> km/h</Text>
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
                    <Text style={styles.detailValue}>
                      {weatherDataForecast.current["pressure_mb"]}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.detailHeaderText}>FORE CAST</Text>
            <View style={styles.forecastContainer}>
              {weatherDataForecast?.forecast?.forecastday
                ?.slice(0, 3)
                .map((day, index) => (
                  <View key={index} style={styles.forecastBox}>
                    <Text style={styles.forecastText}>
                      {day.day["avgtemp_c"] + "°C"}
                    </Text>
                    <Text style={styles.forecastHumidity}>
                      {day.day["avghumidity"] + "%"}
                    </Text>
                    <Image
                      style={styles.forecastIcon}
                      source={{ uri: "http:" + day.day["condition"]["icon"] }}
                    />
                    <Text style={styles.forecastWind}>
                      {day.day["maxwind_kph"] + " km/h"}
                    </Text>
                    <Text
                      style={[
                        styles.forecastDay,
                        {
                          backgroundColor:
                            index === 0
                              ? "#124DA3"
                              : index === 1
                              ? "#F37022"
                              : "#4EB748",
                        },
                      ]}
                    >
                      {daysOfWeek[new Date(day.date).getDay()]}
                    </Text>
                  </View>
                ))}
            </View>
          </ScrollView>
        </>
      ) : (
        // Hiển thị nếu dữ liệu null
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="orange" />
        </View>
      )}
    </View>
  );
};

export default Home_screen;
