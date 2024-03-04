import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    categorys: {
        paddingTop: 19,
        marginBottom: 132
    },
    containerCards: {
        marginHorizontal: 20
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
    button:{
        flexDirection: 'row',
        alignItems: "baseline"
    },
    buttonText: {
        fontSize: 12,
        color: '#6E8CA0ff',
    },
    contentSearch: {
        marginBottom: 20
    }
})