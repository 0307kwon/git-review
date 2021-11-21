import React from "react";
import styled from "styled-components";
import RadioInput from "./RadioInput";

export default {
  component: RadioInput,
  title: "Components/common/RadioInput",
};

const Container = styled.div`
  display: flex;
  gap: 6px;
`;

export const Default = () => {
  return (
    <Container>
      <RadioInput labelText="#미키-1단계-지하철" name="test" />
      <RadioInput labelText="#미키-1단계-지하철" name="test" />
      <RadioInput labelText="#미키-1단계-지하철" name="test" />
      <RadioInput labelText="#미키-1단계-지하철" name="test" />
    </Container>
  );
};
