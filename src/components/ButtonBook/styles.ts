import { StyleSheet, Dimensions } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        minWidth: 140,
        height: 44,
        backgroundColor: theme.colors.primaryBlue,
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRed: {
        width: '100%',
        minWidth: 140,
        height: 44,
        backgroundColor: theme.colors.primaryRed,
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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