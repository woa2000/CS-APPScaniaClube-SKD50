import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 80,
        backgroundColor: "#fff",
        marginTop: 5,
        marginBottom: 10,
        marginRight: 20,
        borderRadius: 10,
        elevation: 5,
        zIndex: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    row:{
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        width: 136,
        height: 107,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentButton:{
        flexDirection: 'row',
        marginTop: 10,        
        marginRight: 15,
    },
    contentInfo:{
        width: '60%',
        height: 50,
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 15,
    },    
    titleInfo: {        
        fontFamily: theme.fonts.roboto700,
        fontSize: 14,
        color: '#334856',
        marginRight: 5,
    },
    infoIco: {        
        color: '#334856',
        fontSize: 14,
        marginRight: 5,
        marginTop:3,
    },
    title: {
        fontFamily: theme.fonts.roboto700,
        fontSize: 14,
        color: '#334856',
    },
    btn_book:{
        width: 50,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#00A6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    }
})