import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { theme } from "../../global/styles/theme";

interface TypeProps {
  type: 'waiting' | 'authorized' | 'refused';
}

export const Container = styled(RectButton)`
  background-color: ${theme.colors.typographySnow};
  border-radius: 20px;

  padding: 17px 24px;
  margin-bottom: 16px;

  flex-direction: row;

  justify-content: space-between;
`;

export const StatusContainer = styled.View<TypeProps>`
  position: absolute;
  right: 0;
  padding: 0px 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 10px;
  
  background-color: ${({ type }) => 
    type === 'authorized' ? '#12A454' :
    type === 'refused' ? '#D90404' :
    '#F5A200'
  };
`;

export const Status = styled.Text`
  font-family: ${theme.fonts.roboto500};
  color: ${theme.colors.secundarySand};
  font-size: 14px;
`;

export const Content = styled.View`
  margin-top: 5px;
`;

export const Label = styled.Text`
  font-family: ${theme.fonts.roboto500};
  font-size: 16px;
`;

export const Item = styled.Text`
  font-family: ${theme.fonts.roboto300};
  font-size: 16px;
  text-transform: capitalize;
  margin-bottom: 5px;
`;
