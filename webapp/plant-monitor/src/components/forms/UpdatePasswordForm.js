import React from "react";
import PropTypes from "prop-types";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";

import InlineError from "../messages/InlineError";

class UpdatePasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        oldPassword: "",
        newPassword: "",
        newPasswordCfrm: ""
      },
      loading: false,
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ data: { ...this.state.data, [name]: value } });
  }

  onSubmit() {
    const errors = this.validate(this.state.data);
    this.setState({ error: errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err => {
        return this.setState({
          error: err.response.data.errors,
          loading: false
        });
      });
    }
  }

  validate(data) {
    const errors = {};
    if (!data.oldPassword) errors.oldPassword = "Please enter your password";
    if (!data.newPassword) errors.newPassword = "Please enter a new password";
    if (!data.newPasswordCfrm)
      errors.newPasswordCfrm = "Please enter a new password";
    if (!(data.newPassword === data.newPasswordCfrm))
      errors.newPassword = "Please make sure you new passwords match";
    return errors;
  }

  render() {
    const { data, error, loading } = this.state;
    return (
      <Form loading={loading.toString()} onSubmit={e => this.onSubmit(e)}>
        {error.global && (
          <Alert variant="danger">
            <Alert.Heading>Something Failed! :(</Alert.Heading>
            <p>{error.global}</p>
          </Alert>
        )}
        <Row>
          <Col md={{ span: 4, offset: 1 }}>
            <Form.Group>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="current password"
                value={data.oldPassword}
                onChange={this.onChange}
              />
              {error.oldPassword && <InlineError message={error.oldPassword} />}
            </Form.Group>
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            <Form.Group>
              <Form.Label>NewPassword</Form.Label>
              <Form.Control
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="password"
                value={data.newPassword}
                onChange={this.onChange}
              />
              {error.newPassword && <InlineError message={error.newPassword} />}
              <br />
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                id="newPasswordCfrm"
                name="newPasswordCfrm"
                placeholder="re-enter your password"
                value={data.newPasswordCfrm}
                onChange={this.onChange}
              />
              {error.newPassword && <InlineError message={error.newPassword} />}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Button
              variant="primary"
              size="lg"
              block
              onClick={e => this.onSubmit(e)}
            >
              Update Password
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

UpdatePasswordForm.propType = {
  submit: PropTypes.func.isRequired
};

export default UpdatePasswordForm;
