import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 268,
  },
  content: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
    height: 77,
    bottom: 0,
  },
  contentIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 45,
    height: 45,
  },
  buttonBack:{
    position: 'absolute',
    top: 45,
    left: 20,
  },
  title: {
    color: theme.colors.typographySnow,
    fontSize: 22,
    fontWeight: "bold",
    width: '100%',
  },
  favorite: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  favoriteIcon: {

  }
})
