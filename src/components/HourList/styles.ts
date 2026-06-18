import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#fff",
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 5,
        zIndex: 5,
        overflow: 'visible',
        shadowColor: "#000",
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentButton:{
        width: 150,
        marginLeft: 12,
        alignSelf: 'flex-start',
    },
    contentInfo:{
        flex: 1,
        paddingRight: 8,
    },    
    titleInfo: {        
        fontFamily: theme.fonts.roboto700,
        fontSize: 14,
        color: '#334856',
    },
    infoIco: {        
        color: '#334856',
        fontSize: 14,
        marginRight: 6,
    },
    dropdownWrapper: {
        marginTop: 10,
    },
    dropdown: {
        height: 42,
        borderWidth: 1,
        borderColor: '#D7DEE5',
        borderRadius: 12,
        paddingHorizontal: 14,
        backgroundColor: '#FFF',
    },
    dropdownContainer: {
        borderRadius: 12,
        borderColor: '#D7DEE5',
    },
    dropdownPlaceholder: {
        color: '#7D8A94',
        fontFamily: theme.fonts.roboto400,
        fontSize: 14,
    },
    dropdownSelectedText: {
        color: '#334856',
        fontFamily: theme.fonts.roboto700,
        fontSize: 14,
    },
    dropdownItem: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    dropdownItemText: {
        color: '#334856',
        fontFamily: theme.fonts.roboto400,
        fontSize: 13,
    },
    dropdownItemDisabledText: {
        color: '#A0AAB3',
        fontFamily: theme.fonts.roboto400,
        fontSize: 13,
    },
})