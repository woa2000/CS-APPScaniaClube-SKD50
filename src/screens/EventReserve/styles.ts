import styled from "styled-components/native"
import { Entypo } from "@expo/vector-icons"
import { theme } from "../../global/styles/theme"
import { BlurView } from "expo-blur"

export const Container = styled.ScrollView.attrs({
  paddingBottom: 70
})`
`;

export const Header = styled(BlurView).attrs({
    intensity: 90,
    tint: "dark"
  })` 
  height: 116px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ContainerIcon = styled.View`
  background-color: ${theme.colors.typographySnow};

  justify-content: center;
  align-items: center;
  margin: 0 20px 0 16px;
  width: 70px;
  height: 70px;
  border-radius: 50px;
`;

export const Icon = styled(Entypo)`
  font-size: 37px;
  color: #D97D54;
`;

export const Information = styled.View`
  width: 90%; 
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.roboto700};
  color: ${theme.colors.typographySnow};
  font-size: 18px;
`;

export const Line = styled.View`
  width: 33px;
  border-bottom-color: ${theme.colors.typographySnow};
  border-bottom-width: 1px;
  margin: 6px 0;
`;

export const Subtitle = styled.Text`
  font-family: ${theme.fonts.roboto300};
  color: ${theme.colors.typographySnow};
  font-size: 13px;
`;

export const Date = styled.Text`
  font-family: ${theme.fonts.roboto300};
  color: ${theme.colors.typographySnow};
  font-size: 13px;
`;

export const Body = styled.View`
  flex: 1;
  text-align: left;
  padding: 50px;  
  justify-content: space-between;
`;

export const Forms = styled.View``;

export const Form = styled.View``;

export const FormTitle = styled.Text`
  font-family: ${theme.fonts.roboto700};
  margin-bottom: 5px;
`;

export const Label = styled.Text`
  color: #BCC5D3;
  font-size: 12px;
`;