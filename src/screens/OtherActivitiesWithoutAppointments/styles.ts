import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
`
export const Content = styled.View`
  padding: 50px;
  text-align: justify;
`

export const Title = styled.Text`
  font-family: ${theme.fonts.roboto700};
  font-size: 16px;
`

export const Description = styled.View`
  margin: 15px 0px;
`