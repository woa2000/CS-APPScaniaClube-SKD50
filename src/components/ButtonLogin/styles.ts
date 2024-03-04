import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        backgroundColor: theme.colors.primaryRed,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    title: {
        flex: 1,
        textTransform: 'uppercase',
        color: theme.colors.typographySnow,
        fontFamily: theme.fonts.montserrat600,
        fontSize: 19,
        textAlign: 'center'
    }
})