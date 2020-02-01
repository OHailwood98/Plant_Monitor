import React from "react";
import Styled from "styled-components";

class WelcomePage extends React.Component {
  render() {
    const CenterDiv = Styled.div`
        text-align: center;
        background-color: #28a745
    `;

    return (
      <body>
        <CenterDiv>
          <h1>Welcome to the Potted Plant Project!</h1>
        </CenterDiv>
      </body>
    );
  }
}

export default WelcomePage;
