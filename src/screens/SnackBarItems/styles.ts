import { StyleSheet } from 'react-native'
import styled from 'styled-components/native';
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
        marginBottom: 20,
        marginTop: 10
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
    content: {
        
    }
})

export const Category = styled.View`

`;
export const Title = styled.Text`
  font-family: ${theme.fonts.roboto700};
  margin: 10px 5%;
  font-size: 18px;
`;