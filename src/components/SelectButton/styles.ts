import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../../global/styles/theme";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background-color: #FFFFFF;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  padding: 18px 16px;
`;

export const Training = styled.Text`
  font-family: ${theme.fonts.roboto300};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: #000000;
`;
