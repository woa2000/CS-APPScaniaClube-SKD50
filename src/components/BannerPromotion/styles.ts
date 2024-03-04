import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('window').width,
        height: 297,
        resizeMode: 'cover',
    },
    content: {
        position: "absolute",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 116,
        bottom: 0,
    },
    contentIcon: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 16,
        borderRadius: 50,
        width: 70,
        height: 70,
    },
    buttonBack:{
        position: 'absolute',
        top: 45,
        left: 20,
    },
    title: {
        color: theme.colors.typographySnow,
        fontFamily: theme.fonts.roboto700,
        fontSize: 21,
        paddingRight: 20
    },
    line: {
        width: 33,
        borderBottomWidth: 1,
        marginVertical: 6,
        borderColor: theme.colors.typographySnow,
    },
    subtitle: {
        color: theme.colors.typographySnow,
        fontFamily: theme.fonts.roboto300,
        paddingRight: 150,
    },
    date: {
        color: theme.colors.typographySnow,
        fontFamily: theme.fonts.roboto500,
        paddingRight: 150
    }
    
})
