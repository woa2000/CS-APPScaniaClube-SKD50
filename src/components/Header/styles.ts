import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: theme.colors.typographySnow,
        borderBottomWidth: 1,
        borderColor: theme.colors.secundaryFossil,
        paddingTop: 45,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#324755',
        fontSize: 18,
        fontWeight: 'bold'
    
    }
})