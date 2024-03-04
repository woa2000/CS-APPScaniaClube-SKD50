import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"
import styled from "styled-components/native"
import { Image } from 'react-native-expo-image-cache'

export const Container = styled.View`
  margin: 0px 16px;
`
export const Avatar = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`

export const ContainerTitle = styled.View`
  margin-top: 10px;
`  

export const Title = styled.Text`
  font-size: 14px;
  text-align: center;
`
export const styles = StyleSheet.create({
  avatar: {
      width: 80,
      height: 80,
      backgroundColor: "#fff",
      borderRadius: 50,
      borderWidth: 2,
      borderColor: theme.colors.primaryBlue,
      justifyContent: "center",
      alignItems: "center",
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0.8, height: 0.8 },
      shadowOpacity: 0.5,
      shadowRadius: 50,
  }
})