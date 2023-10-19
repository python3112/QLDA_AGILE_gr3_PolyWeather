import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: "white",
      width: "100%",
    },
    backgroundImage: {
      height: 200,
      justifyContent: "center",
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 5,
    },
    topLeft: {
      position: "absolute",
      top: 0,
      left: 0,
      padding: 10,
    },
    topRight: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    bottomLeft: {
      position: "absolute",
      bottom: 0,
      left: 0,
      paddingHorizontal: 10,
    },
    bottomRight: {
      position: "absolute",
      bottom: 0,
      right: 0,
      padding: 10,
    },
    textTopLeft: {
      color: "white",
      fontSize: 25,
      fontWeight: "500",
    },
    textBottomLeft: {
      color: "white",
      fontWeight: "200",
      fontSize: 50,
    },
    smallImage: {
      width: 40,
      height: 40,
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
      flexDirection: "row",
    },
    btnModal: {
      borderRadius: 5,
      borderColor: "grey",
      alignSelf: "flex-end",
      borderWidth: 1,
      width: 60,
      paddingHorizontal: 5,
      paddingVertical: 8,
    },
  
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noFavoriteText: {
      fontSize: 16,
      textAlign: "center",
      marginTop: 10,
    },
    imageStyle: {
      width: 60,
      height: 60,
      marginBottom: 5,
    },
  });
  
