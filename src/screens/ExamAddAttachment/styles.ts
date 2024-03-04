import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;

  padding: 20px;

  justify-content: space-between;
`;

export const Attachment = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const PickImageButton = styled(RectButton)`
  background-color: ${theme.colors.primaryBlue};
  border-radius: 40px;
  height: 50px;
  padding: 0 20px;

  justify-content: center;
  align-items: center;
`;

export const TitleButton = styled.Text`
  font-size: 14px;
  color: ${theme.colors.typographySnow};
  font-family: ${theme.fonts.montserrat500};
  text-transform: uppercase;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 70%;

  margin-bottom: 20px;
  padding: 20px;
`;

export const Placeholder = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  
  border-width: 1px;
  border-color: #BCC5D3;
  
`;

export const PlaceholderTitle = styled.Text`
  font-size: 12px;
  text-align: center;

  color: #BCC5D3;
`;
