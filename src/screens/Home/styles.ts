import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    sectionCategory: {
        marginTop: 20,
    },
    containerCards: {
        marginTop: 20,
        marginHorizontal: 20
    },
    titleAndButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: theme.fonts.roboto700,
        fontSize: 18,
    },
    button:{
        flexDirection: 'row',
        alignItems: "baseline"
    },
    buttonText: {
        fontFamily: theme.fonts.roboto300,
        fontSize: 12,
        color: '#6E8CA0ff',
    }

})