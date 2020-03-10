import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";

import { login } from "../../actions/auth";
import LoginForm from "../forms/LoginForm";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <br/>
        <br/>
        <LoginForm submit={this.submit} />
      </div>
    );
  }

  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/"));
}

LoginPage.propType = {
  history: PropType.shape({
    push: PropType.func.isRequired
  }).isRequired,
  login: PropType.func.isRequired,
};

export default connect(null, { login })(LoginPage);
