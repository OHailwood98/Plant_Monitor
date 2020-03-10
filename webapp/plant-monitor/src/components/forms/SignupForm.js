import React from 'react'
import Validator from 'validator'
import PropTypes from 'prop-types'
import {Alert, Button, Form, Row, Col} from 'react-bootstrap'
import Styled from "styled-components";

import InlineError from '../messages/InlineError'

class SignupForm extends React.Component{
    constructor(){
        super()
        this.state = {
            data:{
                email:"",
                username: "",
                password:"",
                passwordCfrm:"",
                phone:"",
                deviceID: "",
                deviceName:"",
                contact:{
                    email:true,
                    phone:false
                }
            },
            loading: false,
            error: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        const {name, value} = event.target
        
         this.setState({data: {...this.state.data, [name]: value}});
    }

    onSubmit(){
        const errors = this.validate(this.state.data);
        this.setState({error:errors});
        if(Object.keys(errors).length ===0){
            this.setState({loading:true})
            this.props
            .submit(this.state.data)
            .catch(err => {
                return (this.setState({error:err.response.data.errors, loading:false}))
            })
        }
    }

    validate(data){
        const errors = {};
        if(!data.password) errors.password = "Please enter a password"
        if(!(data.password === data.passwordCfrm)) errors.password = "Please make sure you passwords match"
        if(!Validator.isEmail(data.email)) errors.email = "Invalid Email"
        if(!data.email) errors.email = "Please enter an email"
        if(!data.username) errors.username = "Please enter an username"
        return errors;
    }
    
    render(){
        const BorderDiv = Styled.div`
            display: inline-block;
            width:90%;
            border-style: solid;
            border-width: 3px;
            border-radius: 2px;
            padding: 25px;
            text-align: left;
        `;
    
        const {data, error, loading} = this.state;
        return(
            <Form loading={loading.toString()} onSubmit={e => this.onSubmit(e)}>
                <BorderDiv style={{"border-color": "#28a745"}} >
                <h3>Your Info</h3>
                    <Row>
                        {error.global && (
                            <Alert variant="danger">
                                <Alert.Heading>Something Failed! :(</Alert.Heading>
                                <p>{error.global}</p>
                            </Alert>
                        )}
                        <Col md={{ span: 4, offset: 1 }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" id="email" name="email" placeholder="example@email.com" value={data.email} onChange={this.onChange}/>
                            {error.email && (
                                <InlineError message={error.email.toString()} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" id="username" name="username" placeholder="username" value={data.username} onChange={this.onChange}/>
                            {error.username && (
                                <InlineError message={error.username.toString()} />
                            )}
                        </Col>
                    </Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <br/>
                        <hr/>
                    </Col>
                    <Row>
                        <Col md={{ span: 4, offset: 1 }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" id="password" name="password" placeholder="password" value={data.password} onChange={this.onChange}/>
                            {error.password && (
                                <InlineError message={error.password.toString()} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="text" id="passwordCfrm" name="passwordCfrm" placeholder="password" value={data.passwordCfrm} onChange={this.onChange}/>
                            {error.password && (
                                <InlineError message={error.password.toString()} />
                            )}
                        </Col>
                    </Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <br/>
                        <hr/>
                    </Col>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" id="phone" name="phone" placeholder="07123456789" value={data.phone} onChange={this.onChange}/>
                            {error.phone && (
                                <InlineError message={error.phone.toString()} />
                            )}
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <h3>Device Info</h3>
                    <Row>
                        <Col md={{ span: 4, offset: 1 }}>
                            <Form.Label>Device ID</Form.Label>
                            <Form.Control type="text" id="deviceID" name="deviceID" placeholder="21" value={data.deviceID} onChange={this.onChange}/>
                            <Form.Label>Written on the underside of your device</Form.Label>
                            {error.deviceID && (
                                <InlineError message={error.deviceID.toString()} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Device Name</Form.Label>
                            <Form.Control type="text" id="deviceName" name="deviceName" placeholder="Kitchen Herbs" value={data.deviceName} onChange={this.onChange}/>
                            <Form.Label>The name you will associate with this device</Form.Label>
                            {error.deviceID && (
                                <InlineError message={error.deviceID.toString()} />
                            )}
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <h3>Contact Info</h3>
                    <Form.Label>How would you like the system to send you alerts?</Form.Label>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Button variant="primary" size="lg" block onClick={e => this.onSubmit(e)}>Sign Up!</Button>
                        </Col>
                    </Row>
                </BorderDiv>
                
            </Form>
        )
    }
}

SignupForm.propType = {
    submit: PropTypes.func.isRequired
}

export default SignupForm