import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width * 0.92;
const windowWidthDetail = Dimensions.get("window").width * 0.282;

export const styles = StyleSheet.create({
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
  temperatureDetails: {
    flexDirection: "row",
    marginEnd: 15,
    alignItems: "flex-end",
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
    fontSize: 16,
    color: "gray",
  },
  locationText: {
    color: "black",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 5,
    maxWidth:'85%'
  },
  weatherStatusText: {
    color: "black",
    fontSize: 16,
  },
  detailHeaderText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    marginVertical:10
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
    marginBottom: 10,
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
  detailValue: {
    fontSize: 28,
    color: "black",
    fontWeight: "400",
  },
  detailUnit: {
    fontSize: 18,
    fontWeight: "300",
    color: "grey",
  },
  // Modal
  messageLogin: {
    color: "red",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  viewModal: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
  },
  headerModal: {
    backgroundColor: "red",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textHeaderModal: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginStart: 15,
  },
  bodyModal: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 70,
    borderBottomWidth: 0.4,
    borderColor: "gray",
    justifyContent: "center",
  },
  footerModal: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "gray",
    justifyContent: "space-around",
    flexDirection:'row'
  },
  btnModal: {
    borderRadius: 5,
    borderColor: "grey",
    alignSelf: "flex-end",
    borderWidth: 1,
    width: 60,
    paddingHorizontal:5,paddingVertical:8
  },
  //Fore cast
  forecastContainer: {
    width: "100%",
  },
  forecastBox: {
    flexDirection:'row',
    borderBottomWidth:1,
    borderStyle:'dotted',
    borderColor: "#A39E9E",
    width: "100%",
    alignItems: "center",
    paddingHorizontal:5
  },
  forecastTextMax: {
    fontSize: 18,
    color:'#FF3333',
    marginBottom: 5,
    marginTop: 5,
    width:'27%',
    textAlign:'center'
  },
  forecastTextMin: {
    fontSize: 18,
    color:'#33CCFF',
    marginBottom: 5,
    marginTop: 5,
    width:'27%',
    textAlign:'center'
  },
  forecastIcon: {
    width: 40,
    height: 40,
  },

  forecastDay: {
    color: "black",
    fontSize: 18,
    paddingVertical: 10,
    fontWeight:'500',
    width:'40%',
  },
 
  // Tìm kiếm
  containerSearch: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    alignItems: "center",
    marginBottom: 10,
  },
  tipSearch: {
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "orange",
    height: 40,
    width: "65%",
    marginEnd: 15,
    fontSize: 17,
    fontWeight: "500",
  },
  btnSearch: {
    backgroundColor: "orange",
    height: 40,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textSearch: { fontWeight: "bold", fontSize: 17, color: "white" },
  temperatureBarContainer: {
    width: 5,
    backgroundColor: "lightgray",
    marginLeft: 10,
    marginRight: 10,
  },
  temperatureBar: {
    backgroundColor: "blue",
    flex: 1,
    borderRadius: 5,
  },
});
