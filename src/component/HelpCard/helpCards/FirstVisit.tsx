import React from "react";
import HelpCardTemplate from "../@common/HelpCardTemplate/HelpCardTemplate";

const FirstVisit = () => {
  return (
    <HelpCardTemplate>
      {{
        title: "π μ²μμ΄μκ΅°μ! νμν©λλ€.",
        subTitle: (
          <>
            κΉλ¦¬λ·°λ κΉν PRμ μ½λ λ¦¬λ·°λ₯Ό λ°λ‘ λͺ¨μ λ³Ό μ μλ μ±μλλ€.
            <br></br>
            λ‘κ·ΈμΈ ν μμ λ§μ μ½λ λ¦¬λ·° λͺ¨μμ§μ λ§λ€μ΄λ³΄μΈμ!
          </>
        ),
      }}
    </HelpCardTemplate>
  );
};

export default FirstVisit;
