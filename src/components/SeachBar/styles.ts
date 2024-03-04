import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        backgroundColor: theme.colors.typographySnow,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 56,
        width: "90%",
        marginBottom: 10,
        borderRadius: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingLeft: 13.7
    },
    button: {
        backgroundColor: theme.colors.primaryBlue,
        justifyContent: "center",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: "center",
        height: 56,
        width: 56,
    },
    textInput: {
        width: "80%",
    },
})