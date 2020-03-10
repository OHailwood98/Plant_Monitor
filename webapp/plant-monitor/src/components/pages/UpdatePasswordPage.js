import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";

import UpdatePasswordForm from "../forms/UpdatePasswordForm";
import { updatePassword } from "../../actions/auth";

class UpdatePasswordPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h2>Password Reset</h2>
        </header>
        <UpdatePasswordForm submit={this.submit} />
      </div>
    );
  }

  submit = data =>
    this.props.updatePassword(data).then(() => this.props.history.push("/"));
}

UpdatePasswordPage.propType = {
  history: PropType.shape({
    push: PropType.func.isRequired
  }).isRequired,
  updatePassword: PropType.func.isRequired
};

export default connect(null, { updatePassword })(UpdatePasswordPage);
