import styled from "styled-components";

export const RootButton = styled.button`
  border-radius: 7px;
  border: none;
  padding: 0.25rem 0.5rem;
  background: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.15s ease;
  }

  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
