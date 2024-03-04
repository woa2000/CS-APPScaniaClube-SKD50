import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { theme } from "../../global/styles/theme";

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0;
`;

export const CheckBox = styled.View`
  flex-direction: row
  margin-right: 10px;
  align-items: center;
  width: 70%;
`;
export const Title = styled.Text`
  font-family: ${theme.fonts.montserrat500};
  color: #BCC5D3
  font-size: 16px;
`;

export const Description = styled.View`
`;

export const Text = styled.Text`
  font-family: ${theme.fonts.roboto300};
  font-size: 16px;
  color: #BCC5D3;
`;
