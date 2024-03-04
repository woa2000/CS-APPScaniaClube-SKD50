import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../../global/styles/theme'

export const Container = styled.View`
  flex: 1;
`
export const ContentTable = styled.View`
  margin-top: 15px;
  background-color: #fff;
  width: 100%;
  height: 100%;
`
export const NavigationButtons = styled.View`
  flex-direction: row;
  width: 100%;
`
export const TitleButton = styled.Text`
  color: #334856;
`
export const Items = styled.View`
  margin: 5px 10px;
  padding-bottom: 100px;
`

export const styles = StyleSheet.create({
  buttonActive: {
    borderBottomColor: theme.colors.primaryRed,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 188,
    height: 50
  },
  buttonInactive: {
    backgroundColor: '#C8D1D3',
    justifyContent: "center",
    alignItems: "center",
    width: 188,
    height: 50,
  },
})