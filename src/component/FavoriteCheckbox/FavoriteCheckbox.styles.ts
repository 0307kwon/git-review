import styled from "styled-components";

export const Label = styled.label`
  .visually-hidden {
    display: block;
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;

    & ~ .checked {
      display: none;
    }
    & ~ .unchecked {
      display: block;
    }

    &:checked ~ .checked {
      display: block;
    }
    &:checked ~ .unchecked {
      display: none;
    }
  }
`;
