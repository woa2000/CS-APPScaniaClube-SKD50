import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        height: 120,
        backgroundColor: "#fff",
        marginBottom: 19,
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
    },
    content: {
        position: "absolute",
        height: 42,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.8)",
        bottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontFamily: theme.fonts.roboto700,
        color: "#334856",
        fontSize: 20,
        marginLeft: 13,
        marginTop: 6
    }
    
})