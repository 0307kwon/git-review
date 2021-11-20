import React from "react";
import styled from "styled-components";
import CheckboxInput from "./CheckboxInput";

export default {
  component: CheckboxInput,
  title: "Components/common/CheckboxInput",
};

const Container = styled.div`
  display: flex;
  gap: 6px;
`;

export const Default = () => {
  return (
    <Container>
      <CheckboxInput labelText="#미키-1단계-지하철" name="test" />
      <CheckboxInput labelText="#미키-1단계-지하철" name="test" />
      <CheckboxInput labelText="#미키-1단계-지하철" name="test" />
      <CheckboxInput labelText="#미키-1단계-지하철" name="test" />
    </Container>
  );
};
