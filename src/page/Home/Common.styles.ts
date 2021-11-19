import styled from "styled-components";

export const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 1.5rem;
  & > h2 {
    margin-bottom: 0.5rem;
  }
`;

export const ReviewCardButton = styled.div`
  border: none;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;
  width: 100%;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;
