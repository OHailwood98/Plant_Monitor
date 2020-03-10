import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import Styled from 'styled-components'

import { signup } from "../../actions/auth";
import SignUpForm from "../forms/SignupForm";

class SignupPage extends React.Component {
  render() {
    const CenterDiv = Styled.div`
      text-align: center;
    `;
    return (
      <div>
        <CenterDiv>
          <header>
            <h2>Sign Up Here</h2>
          </header>
          <SignUpForm submit={this.submit} />
        </CenterDiv>
        
      </div>
    );
  }
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/"));
}

SignupPage.propType = {
  history: PropType.shape({
    push: PropType.func.isRequired
  }).isRequired,
  signup: PropType.func.isRequired
};

export default connect(null, { signup })(SignupPage);
