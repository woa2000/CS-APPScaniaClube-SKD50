import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        marginTop: -20,
        backgroundColor: "#fff",
        borderRadius: 20,
        width: "90%",
        height: 292,
        shadowColor: "#000",
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 2,
    },
    contentButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        marginHorizontal: 20
    },
    buttonActive: {
        backgroundColor: theme.colors.primaryBlue,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginRight: 10,
        height: 32,
        width: 81,
    },
    textButtonActive: {
        textTransform: "uppercase",
        fontSize: 12,
        fontWeight: "bold",
        color: "#fff",
    },
    buttonInactive: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        height: 32,
        width: 81,
    },
    textButtonInactive: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "#ccc",
    },
    contentGraphic:{
        marginTop: -15,
        justifyContent: "center",
        alignItems: "center",
    },
    contentGraphicText:{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    text:{
        color: '#352641',
        fontSize: 30,
    },
    total:{
        color: '#352641',
        fontSize: 11,
    },
    contentHistory:{
        marginTop: 15,
        backgroundColor: '#fff',
        width: "100%",
        height: 270,
    },
    buttons:{
        flexDirection: "row",
        width: "100%",
    },
    title:{
        color: '#334856',
    },
    optionActive: {
        borderBottomColor: theme.colors.primaryRed,
        borderBottomWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 50,
    },
    optionInactive: {
        backgroundColor: '#C8D1D3',
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,
    },
    items: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingBottom: 100
    }
})