import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"
import styled from 'styled-components/native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal:{
        backgroundColor: theme.colors.primaryBlue,
        borderBottomLeftRadius:100,
        borderTopRightRadius: 100,
        height: 526,
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
    },
    row:{
        flex: 1,
        flexDirection: 'row',
    },
    contentForm:{
        width: '100%',
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        height: 250,
    }, 
    contentName:{
        width: '80%',
        height: 50,
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 0,
    },    
    contentAge:{
        width: '20%',
        height: 50,
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 10,
    },    
    contentButton:{
        width: '100%',
        height: 60,
    },
    buttonAdd:{
        width: '100%',
        height: 56,
        backgroundColor: theme.colors.primaryRed,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        color: '#fff',
    },
    contentInfoChieldren:{
        flexDirection: 'column',
        height: 140
    },
    infoName:{
        width: '80%',
        height: 40,
        flexDirection: 'column',
        marginTop: 6,
        marginLeft: 0,
        color: '#fff',
    },    
    infoAge:{
        width: '20%',
        height: 40,
        flexDirection: 'column',
        marginTop: 6,
        marginLeft: 10,
        color: '#fff',
    },    
})

export const Form = styled.View`
  padding: 0px 0px;
  flex: 1;
  flexDirection: 'row';
`

export const Label = styled.Text`
  color: #BCC5D3;
  font-size: 12px;
`