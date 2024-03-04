import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal:{
        backgroundColor: theme.colors.primaryBlue,
        borderBottomLeftRadius:100,
        borderTopRightRadius: 100,
        height: 226,
        padding: 32,
        elevation: 10
    },
    title:{
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    message:{
        color: '#fff',
        fontSize: 16,
        marginTop: 35,
    },
    button: {
        backgroundColor: '#CEC0D8',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 50,
        bottom: 24,
        right: 24,
        height: 52,
        width: 52,
    },
    buttonCancel: {
        backgroundColor: '#D47FA6',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 50,
        bottom: 24,
        right: 84,
        height: 52,
        width: 52,
    }
})