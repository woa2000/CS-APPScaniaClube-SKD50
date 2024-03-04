import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../global/styles/theme";

export const Container = styled.ScrollView`
  flex: 1;
`;

export const VideoContainer = styled.View`
  width: ${RFPercentage(100)}px;
  height: ${RFPercentage(30)}px;
  background-color: #000000;
`;

export const Content = styled.View`
  padding: 20px 40px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.montserrat700};
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Header = styled.Text`
  font-family: ${theme.fonts.montserrat700};
  text-align: left;
  font-size: 16px;
  margin-bottom: 6px;
`;

export const Description = styled.Text`
  font-family: ${theme.fonts.montserrat500};
  font-size: 14px;
  line-height: 24px;
`;