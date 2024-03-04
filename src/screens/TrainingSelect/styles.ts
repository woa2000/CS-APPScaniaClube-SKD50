import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";

interface TrainingProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.typographySnow};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${theme.colors.typographySnow};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.roboto700};
  color: ${theme.colors.primaryBlue};
  font-size: ${RFValue(18)}px;
`;

export const Training = styled.TouchableOpacity<TrainingProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive }) =>
    isActive ? theme.colors.primaryBlue_light : theme.colors.typographySnow
  };
`;
export const Icon = styled(MaterialCommunityIcons)<TrainingProps>`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(16)}px;

  color: ${({ isActive }) =>
    isActive ? theme.colors.typographySnow : theme.colors.typographyOnyx
  };
`;

export const Name = styled.Text<TrainingProps>`
  font-family: ${theme.fonts.roboto300};
  font-size: ${RFValue(14)}px;

  color: ${({ isActive }) =>
    isActive ? theme.colors.typographySnow : theme.colors.typographyOnyx
  };
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #000000;
`;

export const Footer = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7, 
})`
  width: 100%;
  height: ${RFValue(56)}px;
  background-color: ${theme.colors.primaryBlue};
  border-radius: 28px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: ${theme.fonts.montserrat600};
  color: ${theme.colors.typographySnow};
  font-size: ${RFValue(18)}px;
  text-transform: uppercase;
`;