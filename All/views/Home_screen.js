import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
import {
  addFavoriteLocationByUsername,
  removeFavoriteLocationByUsername,
  checkIfLocationExists,
} from "../db/favorite";
import {
  getHourlyForecast,
  calculateSunMoon,
  getImagePath,
} from "../utilities/utilities";
import { FlatList } from "react-native-gesture-handler";
import * as Location from "expo-location";
const Home_screen = ({ route, navigation }) => {
  const { userNameLogin, locationAddressFr, addressNow } = route.params;
  const [locationNow, setLocationNow] = useState(addressNow);
  const [searchAddress, setSearchAddress] = useState(null);
  const _ = require("lodash");
  const [weatherDataForecast, setWeatherDataForecast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [isVisibleYT, setIsVisibleYT] = useState(false);
  const [srcImage, setSrcImage] = useState(require("../image/cloudy.jpg"));
  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("dddd, MMMM D, YYYY")
  );
  const [imageFovirite, setImageFavorite] = useState(
    require("../image/heart_one.png")
  );
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Cập nhập trạng thái icon yêu thích sau khi quay lại màn hình
  useFocusEffect(
    useCallback(() => {
      setSearchAddress("");
      checkIfLocationExists(
        userNameLogin,
        weatherDataForecast,
        setImageFavorite,
        setCheckFavorite
      );
    }, [])
  );
  // Tải vị trí hiện tại
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        console.log("Đang tải vị trí");
        setLocationNow(
          `${location.coords.latitude},${location.coords.longitude}`
        );
      }
    } catch (error) {
      console.log("Error getting location: ", error);
    }
  };

  // Tải vị trí hiện tại
  useEffect(() => {
    if (!locationNow) {
      getLocation();
    }
  }, [locationNow]);
  // Lấy ngày hiện tại
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(moment().format("dddd, MMMM D, YYYY"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // Tải dữ liệu
  useEffect(() => {
    if (locationAddressFr != undefined) {
      loadDataYT();
    } else {
      if (locationNow) {
        loadData();
      } else {
        getLocation();
      }
    }
  }, [locationNow, locationAddressFr]);

  // Render thông tin thời tiết hàng giờ
  const filteredHourlyForecast = getHourlyForecast(weatherDataForecast);
  const renderHourlyForecast = () => {
    if (filteredHourlyForecast && filteredHourlyForecast.length > 0) {
      return (
        <FlatList
          data={filteredHourlyForecast}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{ marginEnd: 5, padding: 5, alignItems: "center" }}
              key={index}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {moment(item.time).format("HH:mm")}
              </Text>
              <Image
                style={styles.forecastIcon}
                source={{ uri: "http:" + item.condition.icon }}
              />
              <Text style={{ fontSize: 16 }}>{item.temp_c}°</Text>
            </View>
          )}
        />
      );
    }
    return null;
  };
  // Mở đóng modal
  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setIsVisible(false);
  };
  // Mở đóng modal xóa yêu thích
  const openModalYT = () => {
    setIsVisibleYT(true);
  };
  const closeModalYT = () => {
    setIsVisibleYT(false);
  };
  // Tải dữ liệu thời tiết từ API theo vị trí hiện tại
  const loadData = async () => {
    console.log("loadData");
    fetchWeatherForecast(locationNow)
      .then((data) => {
        setWeatherDataForecast(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Tải dữ liệu thời tiết từ API theo vị trí yêu thích
  const loadDataYT = async () => {
    console.log("loadDataYT");
    fetchWeatherForecast(locationAddressFr)
      .then((data) => {
        setWeatherDataForecast(data);
      })
      .catch((error) => {
        openModal();
      });
  };
  // Tải dữ liệu thời tiết từ API theo vị trí tìm kiếm
  const loadDataSearch = async () => {
    fetchWeatherForecast(searchAddress)
      .then((data) => {
        setWeatherDataForecast(data);
      })
      .catch((error) => {
        openModal();
      });
  };
  // Xác nhận xóa
  const confirmDelete = (userNameLogin, address) => {
    removeFavoriteLocationByUsername(
      userNameLogin,
      address,
      checkFavorite,
      setCheckFavorite,
      setImageFavorite
    );
    closeModalYT();
  };
  // Thay đổi ảnh theo trạng thái thời tiết được lấy về từ API
  useEffect(() => {
    if (weatherDataForecast) {
      const conditionText =
        weatherDataForecast.current["condition"]["text"].toLowerCase();
      const imagePath = getImagePath(conditionText);
      setSrcImage(imagePath);
    }
  }, [weatherDataForecast]);
  // Trạng thái của icon yêu thích
  useEffect(() => {
    if (userNameLogin !== null && weatherDataForecast) {
      checkIfLocationExists(
        userNameLogin,
        weatherDataForecast,
        setImageFavorite,
        setCheckFavorite
      );
    }
  }, [userNameLogin, weatherDataForecast]);

  // Click yêu thích
  const onPressFovorite = (address) => {
    if (checkFavorite) {
      addFavoriteLocationByUsername(
        userNameLogin,
        address,
        checkFavorite,
        setCheckFavorite,
        setImageFavorite
      );
    } else {
      openModalYT();
    }
  };
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
      {/* Modal xóa địa điểm yêu thích */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibleYT}
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
              <Text style={styles.textHeaderModal}>Message</Text>
            </View>
            <View style={styles.bodyModal}>
              <Text style={{ fontSize: 16 }}>
                Are you sure to delete this address favorite?
              </Text>
            </View>
            <View style={styles.footerModal}>
              <TouchableOpacity onPress={closeModalYT} style={styles.btnModal}>
                <Text style={{ textAlign: "center" }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  confirmDelete(
                    userNameLogin,
                    weatherDataForecast.location["name"]
                  )
                }
                style={styles.btnModal}
              >
                <Text style={{ textAlign: "center" }}>Yes</Text>
              </TouchableOpacity>
            </View>
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
                onPress={() => loadDataSearch(searchAddress)}
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
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.locationText}>
                {weatherDataForecast.location["name"]}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  onPressFovorite(weatherDataForecast.location["name"])
                }
                style={{
                  width: 30,
                  height: 30,
                  marginStart: 5,
                }}
              >
                <Image
                  style={{ width: 30, height: 30, marginTop: 2 }}
                  source={imageFovirite}
                />
              </TouchableOpacity>
            </View>

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
            {/* Dự báo */}
            <Text style={styles.detailHeaderText}>FORE CAST</Text>
            {/* Dự báo theo giờ */}
            <View
              style={{
                width: "100%",
                backgroundColor: "#eeeeee",
                padding: 10,
                borderRadius: 5,
              }}
              
            >
              <TouchableOpacity onPress={()=>navigation.navigate('hourly',{data:filteredHourlyForecast})}>
              <Text style={{ fontSize: 17, fontWeight: "500" }}>Hourly</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "gray",
                  marginTop: 5,
                }}
              />
              {renderHourlyForecast()}
            </View>
            {/* Dự báo theo ngày */}
            <View
              style={{
                width: "100%",
                backgroundColor: "#eeeeee",
                padding: 10,
                marginVertical: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "500" }}>Daily</Text>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "gray",
                  marginTop: 5,
                }}
              />
              <View style={styles.forecastContainer}>
                {weatherDataForecast?.forecast?.forecastday
                  ?.slice(0, 3)
                  .map((day, index) => (
                    <TouchableOpacity key={index} style={styles.forecastBox} onPress={()=>navigation.navigate('daily',{data:day,date:daysOfWeek[new Date(day.date).getDay()]})}>
                      <Text style={styles.forecastDay}>
                        {daysOfWeek[new Date(day.date).getDay()]}
                      </Text>
                      <Image
                        style={styles.forecastIcon}
                        source={{ uri: "http:" + day.day["condition"]["icon"] }}
                      />
                      <Text style={styles.forecastTextMax}>
                        {day.day["maxtemp_c"] + "°"}
                      </Text>
                      <Text style={styles.forecastTextMin}>
                        {day.day["mintemp_c"] + "°"}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
            {/* Mặt trời và mặt trăng */}
            <Text style={styles.detailHeaderText}>Sun & Moon</Text>
            <View
              style={{
                width: "100%",
                backgroundColor: "#eeeeee",
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
                flexDirection: "row",
              }}
            >
              {/* Mặt trời */}
              <View
                style={{ width: "50%", borderRightWidth: 1, paddingEnd: 10 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingBottom: 12,
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../image/sun.png")}
                  />
                  <View style={{ justifyContent: "space-evenly" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "right",
                        fontWeight: "500",
                      }}
                    >
                      {
                        calculateSunMoon(
                          weatherDataForecast["forecast"]["forecastday"]["0"][
                            "astro"
                          ]["sunrise"],
                          weatherDataForecast["forecast"]["forecastday"]["0"][
                            "astro"
                          ]["sunset"]
                        ).hours
                      }{" "}
                      hours
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "right",
                        fontWeight: "500",
                      }}
                    >
                      {
                        calculateSunMoon(
                          weatherDataForecast["forecast"]["forecastday"]["0"][
                            "astro"
                          ]["sunrise"],
                          weatherDataForecast["forecast"]["forecastday"]["0"][
                            "astro"
                          ]["sunset"]
                        ).minutes
                      }{" "}
                      minutes
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: "grey",
                    borderTopWidth: 0.5,
                    paddingVertical: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    Sunrire
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {moment(
                      weatherDataForecast["forecast"]["forecastday"]["0"][
                        "astro"
                      ]["sunrise"],
                      "hh:mmA"
                    ).format("HH:mm")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: "grey",
                    borderTopWidth: 0.5,
                    paddingVertical: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    Sunset
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {moment(
                      weatherDataForecast["forecast"]["forecastday"]["0"][
                        "astro"
                      ]["sunset"],
                      "hh:mmA"
                    ).format("HH:mm")}
                  </Text>
                </View>
              </View>
              {/* Mặt trăng */}
              <View style={{ width: "50%", paddingStart: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingBottom: 12,
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../image/moon.png")}
                  />

                  <View style={{ justifyContent: "space-evenly" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "right",
                        fontWeight: "500",
                      }}
                    >
                      {
                        calculateSunMoon(
                          weatherDataForecast["forecast"]["forecastday"]["0"][
                            "astro"
                          ]["moonrise"],
                          weatherDataForecast["forecast"]["forecastday"]["0"][
                            "astro"
                          ]["moonset"]
                        ).hours
                      }{" "}
                      hours
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "right",
                        fontWeight: "500",
                      }}
                    >
                      {
                        calculateSunMoon(
                          weatherDataForecast["forecast"]["forecastday"]["0"][
                            "astro"
                          ]["moonrise"],
                          weatherDataForecast["forecast"]["forecastday"]["0"][
                            "astro"
                          ]["moonset"]
                        ).minutes
                      }{" "}
                      minutes
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: "grey",
                    borderTopWidth: 0.5,
                    paddingVertical: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    Moonrire
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {moment(
                      weatherDataForecast["forecast"]["forecastday"]["0"][
                        "astro"
                      ]["moonrise"],
                      "hh:mmA"
                    ).format("HH:mm")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: "grey",
                    borderTopWidth: 0.5,
                    paddingVertical: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    Moonset
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {moment(
                      weatherDataForecast["forecast"]["forecastday"]["0"][
                        "astro"
                      ]["moonset"],
                      "hh:mmA"
                    ).format("HH:mm")}
                  </Text>
                </View>
              </View>
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
          <Text style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}>
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home_screen;
