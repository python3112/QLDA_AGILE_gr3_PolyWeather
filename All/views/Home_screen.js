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
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, set, push, get, child } from "firebase/database";

import firebase from "../db/firebase";

const Home_screen = (props) => {
  const { navigation, route } = props;
  const { locationAddressYT, locationNow } = route.params || {};
  const [address, setAddress] = useState(locationNow);
  const [locationAddressFr, setLocationAddressFr] = useState(locationAddressYT);
  const [searchAddress, setSearchAddress] = useState(null);

  const _ = require("lodash");
  const [userNameLogin, setUserNameLogin] = useState(null);
  const [weatherDataForecast, setWeatherDataForecast] = useState(null);
  const [dataFavorite, setDataFavorite] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [isVisibleYT, setIsVisibleYT] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [srcImage, setSrcImage] = useState(require("../image/cloudy.jpg"));
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
useFocusEffect(
    React.useCallback(() => {
      console.log("Màn hình home, đang cập nhật dữ liệu...");
      loadData();
      setRefresh(!refresh);
    }, [])
  );
  useEffect(() => {
    console.log("Đang chạy getStoredUsername");
    const getStoredUsername = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Data_User");
        if (jsonValue !== null) {
          const data = JSON.parse(jsonValue);
          if (data.username) {
            setUserNameLogin(data.username);
          }
        } else {
          console.log("Không tìm thấy dữ liệu.");
          return null;
        }
      } catch (e) {
        console.log("Lỗi khi đọc dữ liệu: ", e);
        return null;
      }
    };

    getStoredUsername(); // Gọi hàm ở đây để nó tự chạy khi vào màn hình
  }, []);

  // Chức năng dự báo 24h tiếp theo tính từ giờ hiện tại
  const currentTime = moment();
  const startDateTime = currentTime.clone().add(0, "hour");
  const endDateTime = currentTime.clone().add(23, "hours");
  // Lấy ra những giờ tiếp theo của ngày hiện tại
  const filteredHourlyForecast =
    weatherDataForecast?.forecast?.forecastday[0]?.hour?.filter((hourData) => {
      const hourDateTime = moment(hourData.time);
      return hourDateTime.isBetween(startDateTime, endDateTime);
    });
  // Lấy ra những giờ tiếp theo của ngày tiếp theo nếu chưa đủ 24h
  if (filteredHourlyForecast && filteredHourlyForecast.length < 24) {
    // Không đủ 24 giờ trong filteredHourlyForecast, nên tăng chỉ số của forecastday lên 1
    const nextDayForecast = weatherDataForecast?.forecast?.forecastday[1]?.hour;
    // Kiểm tra xem nextDayForecast có tồn tại và có đủ 24 giờ không
    if (
      nextDayForecast &&
      nextDayForecast.length >= 24 - filteredHourlyForecast.length
    ) {
      // Lấy các giờ còn thiếu từ nextDayForecast và thêm vào filteredHourlyForecast
      const additionalHours = nextDayForecast.slice(
        0,
        24 - filteredHourlyForecast.length
      );
      filteredHourlyForecast.push(...additionalHours);
    }
  }
  // Tính tổng thời gian mặt trời,mặt trăng từ lúc xuất hiện đến khi lặn
  const calculateSunMoon = (startTime, endTime) => {
    const start = moment(startTime, "hh:mmA");
    const end = moment(endTime, "hh:mmA");
    const duration = moment.duration(end.diff(start));

    const hours = duration.hours();
    const minutes = duration.minutes();

    return { hours, minutes };
  };
  // Render thông tin hàng giờ
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
  // Mở đóng modal yêu thích
  const openModalYT = () => {
    setIsVisibleYT(true);
  };
  const closeModalYT = () => {
    setIsVisibleYT(false);
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
  const loadData = async () => {
    console.log("Đang chạy fetchWeatherForecast");
    fetchWeatherForecast(!!locationAddressFr ? locationAddressFr : address)
      .then((data) => {
        setWeatherDataForecast(data);
      })
      .catch((error) => {
        openModal();
      });
  }
  // Lấy dữ liệu từ api
  useEffect(() => {
    loadData();
  }, [address, locationAddressFr]);

  // Xác nhận xóa
  const confirmDelete = (userNameLogin, address) => {
    removeFavoriteLocationByUsername(userNameLogin, address);
    closeModalYT();
  };
  // Dự báo
  // Thay đổi ảnh theo tình trạng thời tiết
  useEffect(() => {
    console.log("Đang chạy Thay đổi ảnh theo tình trạng thời tiết");

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

  // Trạng thái của icon yêu thích
  useEffect(() => {
    const checkIfLocationExists = async () => {
      console.log("Đang chạy Trạng thái của icon yêu thích");

      const db = getDatabase();
      const userRef = ref(db, "users");
      try {
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const users = snapshot.val();
          const userId = _.findKey(
            users,
            (userData) => userData.username === userNameLogin
          );

          if (userId) {
            const userRef = ref(db, `users/${userId}/favoriteLocations`);
            const snapshot = await get(userRef);
            const favoriteLocations = snapshot.val();
            setDataFavorite(favoriteLocations);
            const existingLocation = _.find(
              favoriteLocations,
              (loc) =>
                loc.locationAddress === weatherDataForecast?.location?.name
            );

            if (existingLocation) {
              setImageFavorite(require("../image/heart_two.png"));
              setCheckFavorite(false);
            } else {
              setImageFavorite(require("../image/heart_one.png"));
              setCheckFavorite(true);
            }
          }
        }
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu:", error);
        throw error;
      }
    };

    if (userNameLogin !== null && weatherDataForecast) {
      checkIfLocationExists();
    }
  }, [weatherDataForecast]);
  // Xóa địa điểm yêu thích
  const removeFavoriteLocationByUsername = async (username, location) => {
    try {
      const db = getDatabase();
      const userRef = ref(db, "users");
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = _.findKey(
          users,
          (userData) => userData.username === username
        );

        if (userId) {
          const userFavoriteLocationsRef = ref(
            db,
            `users/${userId}/favoriteLocations`
          );
          const snapshotFavoriteLocations = await get(userFavoriteLocationsRef);
          const favoriteLocations = snapshotFavoriteLocations.val();

          const existingLocation = _.find(
            favoriteLocations,
            (loc) => loc.locationAddress === location
          );
          if (existingLocation) {
            const existingLocationId = _.findKey(
              favoriteLocations,
              (data) => data.locationAddress === location
            );
            if (existingLocationId) {
              const locationRef = ref(
                db,
                `users/${userId}/favoriteLocations/${existingLocationId}`
              );
              await set(locationRef, null);
              setCheckFavorite(!checkFavorite);
              setImageFavorite(require("../image/heart_one.png"));
              return;
            }
          } else {
            setCheckFavorite(!checkFavorite);
            setImageFavorite(require("../image/heart_two.png"));
            return;
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      throw error;
    }
  };
  // Thêm địa điểm yêu thích
  const addFavoriteLocationByUsername = async (username, location) => {
    try {
      const db = getDatabase();
      const userRef = ref(db, "users");
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = _.findKey(
          users,
          (userData) => userData.username === username
        );

        if (userId) {
          const userFavoriteLocationsRef = ref(
            db,
            `users/${userId}/favoriteLocations`
          );
          const snapshotFavoriteLocations = await get(userFavoriteLocationsRef);
          const favoriteLocations = snapshotFavoriteLocations.val();

          const existingLocation = _.find(
            favoriteLocations,
            (loc) => loc.locationAddress === location
          );
          if (!existingLocation) {
            const newLocationRef = push(userFavoriteLocationsRef);
            await set(newLocationRef, { locationAddress: location });
            setCheckFavorite(!checkFavorite);
            setImageFavorite(require("../image/heart_two.png"));
            return;
          } else {
            setCheckFavorite(!checkFavorite);
            setImageFavorite(require("../image/heart_one.png"));
            return;
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi thêm dữ liệu:", error);
      throw error;
    }
  };

  // Click yêu thích
  const onPressFovorite = (address) => {
    if (checkFavorite) {
      addFavoriteLocationByUsername(userNameLogin, address);
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
                onPress={() => [
                  setAddress(searchAddress),
                  setLocationAddressFr(""),
                ]}
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
              <Text style={{ fontSize: 17, fontWeight: "500" }}>Hourly</Text>
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
                    <View key={index} style={styles.forecastBox}>
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
                    </View>
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
        </View>
      )}
    </View>
  );
};

export default Home_screen;
