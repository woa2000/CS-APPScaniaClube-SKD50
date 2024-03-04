import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

interface Props {
  type: number | undefined,
}

export const Container = styled.View<Props>``;

export const FormTitle = styled.Text`
  font-family: ${theme.fonts.roboto700};
  margin-bottom: 5px;
`;

export const Label = styled.Text`
  color: #9DAABF;
  font-size: 12px;
`;