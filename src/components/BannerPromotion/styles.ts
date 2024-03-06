import { StyleSheet, Dimensions, Platform } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 2,
        resizeMode: 'contain',
        marginBottom: 100,
        ...Platform.select({
            ios: {
                marginTop: 60,
            },
            android: {
                marginTop: 0,
            },
          }),
    },
    content: {
        position: "absolute",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 100,
        bottom: 0,
    },
    contentIcon: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 16,
        borderRadius: 25,
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    buttonBack:{
        position: 'absolute',
        top: 45,
        left: 20,
    },
    title: {
        color: theme.colors.typographySnow,
        fontFamily: theme.fonts.roboto700,
        fontSize: 18,
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
        fontSize: 14,
        paddingRight: 100,
    },
    date: {
        color: theme.colors.typographySnow,
        fontFamily: theme.fonts.roboto500,
        paddingRight: 100
    }
    
})
