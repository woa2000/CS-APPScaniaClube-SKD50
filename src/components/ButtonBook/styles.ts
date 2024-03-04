import { StyleSheet, Dimensions } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        width: '58%',
        height: 35,
        backgroundColor: theme.colors.primaryBlue,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    containerRed: {
        width: '58%',
        height: 35,
        backgroundColor: theme.colors.primaryRed,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    title: {
        flex: 1,
        textTransform: 'uppercase',
        color: theme.colors.typographySnow,
        fontFamily: theme.fonts.montserrat600,
        fontSize: 14,
        textAlign: 'center'
    },
})