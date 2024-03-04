import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    containerCards: {
        marginTop: 10,
        marginHorizontal: 20,
    },
    contentSearch: {
        marginBottom: 20
    },
    titleAndButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})