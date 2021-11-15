import React from "react";
import styled from "styled-components";
import RadioButton from "./RadioButton";

export default {
  component: RadioButton,
  title: "Components/common/RadioButton",
};

const Container = styled.div`
  display: flex;
  gap: 6px;
`;

export const Default = () => {
  return (
    <Container>
      <RadioButton labelText="#미키-1단계-지하철" name="test" />
      <RadioButton labelText="#미키-1단계-지하철" name="test" />
      <RadioButton labelText="#미키-1단계-지하철" name="test" />
      <RadioButton labelText="#미키-1단계-지하철" name="test" />
    </Container>
  );
};
