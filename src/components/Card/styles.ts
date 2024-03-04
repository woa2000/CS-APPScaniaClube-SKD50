import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 136, 
        height: 182,
        backgroundColor: "#fff",
        marginTop: 15,
        marginBottom: 19,
        marginRight: 20,
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    image: {
        width: 136,
        height: 107,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    contentTitle: {
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 25,
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: theme.fonts.roboto700,
        fontSize: 15,
        color: '#334856',
        textAlign: "center",
    },
    content: {
    }
})