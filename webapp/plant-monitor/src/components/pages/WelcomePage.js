import React from "react";
import Styled from "styled-components";

class WelcomePage extends React.Component {
  render() {
    const CenterDiv = Styled.div`
        display: inline-block;
        text-align: center;
        width: 100%;
    `;

    const SizingDiv = Styled.div`
        display: inline-block;
        text-align: center;
        width: 85%;
    `;

    const MainBody = Styled.body`
        text-align: center;
        background-color: #79f996
    `;

    return (
      <MainBody>
        <SizingDiv>
          <br />
          <br />
          <CenterDiv>
            <h1 className="display-3 font-weight-bold">
              Welcome to the Potted Plant Project!
            </h1>
            <p style={{ color: "#6c6c6c" }}>
              The System to help you not kill your potted plants
            </p>
          </CenterDiv>
          <br />
        </SizingDiv>
      </MainBody>
    );
  }
}

export default WelcomePage;
