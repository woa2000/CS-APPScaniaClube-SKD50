import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../../global/styles/theme";

export const Container = styled.View`
  flex: 1;
`;

export const Body = styled.View`
  flex: 1;
`;

export const Item = styled.View`
  width: 100%;
  padding: ${RFValue(10)}px;
`;

export const Footer = styled.View`
  padding: 20px 20px;
`;

export const CheckBox = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-family: ${theme.fonts.roboto300};
`;

export const ErrorMessage = styled.Text`
  color: ${theme.colors.primaryRed};
	font-size: ${RFValue(13)}px;
  margin-top: ${RFValue(10)}px;
`;