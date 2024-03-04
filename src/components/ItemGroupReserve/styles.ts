import styled from 'styled-components/native'
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;

export const Price = styled.Text`
  font-size: 12px;
  font-family: ${theme.fonts.roboto700};
`;