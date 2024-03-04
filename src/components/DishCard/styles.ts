import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"
import styled from "styled-components/native"
import { Image } from 'react-native-expo-image-cache'
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 90%;
  height: 120px;
  margin-left: 5%;
  margin-bottom: 19px;
  background-color: #FFFFFF;
  border-radius: 10px;
  elevation: 2;
  align-items: center;
  justify-content: center;
`;

export const ImgCard = styled(Image)`
  width: 100%;
  height: 120px;
  border-radius: 10px;
`;

export const InfoBar = styled.View`
  position: absolute;
  bottom: 0;
  height: 42px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const TitleCard = styled.Text`
  font-family: ${theme.fonts.roboto700};
  font-size: 20px;
  color: #334856;
  margin-top: 6px;
  margin-left: 13px;
`;

export const Price = styled.Text`
  font-family: ${theme.fonts.roboto700};
  font-size: 20px;
  color: #334856;
  margin-top: 6px;
  margin-right: 13px;
`;

