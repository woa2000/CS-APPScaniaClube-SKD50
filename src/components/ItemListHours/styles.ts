import styled from 'styled-components/native'
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0.2px; 
  border-bottom-color: #998FA2;
  padding: 10px 0;
  `;

export const Information = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Ball = styled.View`
  background-color: #348CE0;
  width: 14px;
  height: 14px;
  border-radius: 50px;
  margin-right: 16px;
`;

export const Dates = styled.Text`
  font-family: ${theme.fonts.roboto700};
  font-size: 14px;
`;

export const Hours = styled.Text`
  font-family: ${theme.fonts.roboto300};
  font-size: 14px;
`;

export const Contact = styled.Text``;