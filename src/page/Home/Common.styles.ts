import styled from "styled-components";
import ReviewCardButton from "../../component/ReviewCardButton/ReviewCardButton";

export const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 1.5rem;
  & > h2 {
    margin-bottom: 0.5rem;
  }
`;

export const StyledReviewCardButton = styled(ReviewCardButton)`
  margin-bottom: 1.5rem;
  width: 100%;
`;
