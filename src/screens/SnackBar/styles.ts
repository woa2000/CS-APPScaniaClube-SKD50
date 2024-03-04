import { StyleSheet } from "react-native"
import styled from 'styled-components/native'
import { theme } from "../../global/styles/theme"

export const Container = styled.ScrollView`
  flex: 1;
`

export const CardsContainer = styled.View`
  margin: 20px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Label = styled.Text`
  font-family: ${theme.fonts.roboto700};
  font-size: 18px;
  font-weight: bold;
`

export const ButtonAllItems = styled.TouchableOpacity`
  flex-direction: row;
  align-items: baseline;
`

export const ButtonText = styled.Text`
  font-family: ${theme.fonts.roboto300};
  font-size: 13px;
  color: #6E8CA0ff;
  margin-right: 5px;
`

export const Cards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false
})``

export const ContainerHours = styled.View`
  margin: 0px 20px;
`

export const Content = styled.ScrollView`
  background-color: #FFFFFF;
  margin: 15px 0px 30px;
  padding: 26px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 20);
`

export const styles = StyleSheet.create({
  item:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#998FA2',
    borderBottomWidth: 0.2,
    paddingVertical: 12,
  },
  ball: {
    backgroundColor: '#348ce0',
    borderRadius: 50,
    marginRight: 16,
    height: 14,
    width: 14,
  },
  textDays: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '55%',
  },
  textOpeningHours: {
    fontSize: 14,
    color: '#352641'
  }
})
