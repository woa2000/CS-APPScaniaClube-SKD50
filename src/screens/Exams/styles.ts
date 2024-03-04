import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  padding: 24px 0;
  align-items: center;
`;

export const SearchBarContainer = styled.View`
  width: 100%;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 14px;
  justify-content: space-between;
`;

export const ExamsView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;