import { ScrollView } from "react-native"
import styled from "styled-components/native"
import { theme } from "../../global/styles/theme";

export const Container = styled(ScrollView)`
  flex: 1;
`;

export const ContainerSearchBar = styled.View`
  margin: 10px 20px;
`;

export const ExerciseList = styled.View`
  background-color: #FFFFFF;
  align-items: center;
  border-radius: 20px;
  width: 90%;
  margin: 10px 20px;
  elevation: 1;
  z-index: 1;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.roboto700};
  font-size: 25px;
  margin-top: 10px;
`;

export const List = styled.View`
  margin: 10px 0;
`;
