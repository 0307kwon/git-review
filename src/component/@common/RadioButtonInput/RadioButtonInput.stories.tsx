import React from "react";
import styled from "styled-components";
import RadioButtonInput from "./RadioButtonInput";

export default {
  component: RadioButtonInput,
  title: "Components/common/RadioButton",
};

const Container = styled.div`
  display: flex;
  gap: 6px;
`;

export const Default = () => {
  return (
    <Container>
      <RadioButtonInput labelText="#미키-1단계-지하철" name="test" />
      <RadioButtonInput labelText="#미키-1단계-지하철" name="test" />
      <RadioButtonInput labelText="#미키-1단계-지하철" name="test" />
      <RadioButtonInput labelText="#미키-1단계-지하철" name="test" />
    </Container>
  );
};
