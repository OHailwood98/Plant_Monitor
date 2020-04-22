import React from 'react'
import Validator from 'validator'
import PropTypes from 'prop-types'
import { Alert, Button, Form, Row, Col } from 'react-bootstrap'
import Styled from "styled-components";

import InlineError from '../messages/InlineError'

const BorderDiv = Styled.div`
display: inline-block;
width:90%;
border-style: solid;
border-width: 3px;
border-radius: 2px;
padding: 25px;
text-align: left;
border-color: #28a745;
`;

const CenterDiv = Styled.div`
text-align: center;
`;

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
                contact: "email"
            },
            loading: false,
            error: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onContactChange = this.onContactChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        const {name, value} = event.target
        this.setState({data: {...this.state.data, [name]: value}});
    }

    onContactChange(event){
        const {name} = event.target
        this.setState({...this.state, data: {...this.state.data, contact: name}});
    }

    onSubmit(){
        const errors = this.validate(this.state.data);
        this.setState({error:errors});
        if(Object.keys(errors).length ===0){
            this.setState({loading:true})
            this.props
            .submit(this.state.data)
            .catch(err => {
                console.dir(err.response.data.errors)
                return (this.setState({...this.state, error:err.response.data.errors, loading:false}))
            })
        }
    }

    validate(data){
        const errors = {};
        var phoneExp = new RegExp("^07[0-9]{9}$")
        var devExp = new RegExp("^[0-9]{2,4}$")
        if(!data.password.trim()) errors.password = {message:"Please enter a password"}
        if(!(data.password.trim() === data.passwordCfrm.trim())) errors.password = {message:"Please make sure you passwords match"}
        if(!Validator.isEmail(data.email)) errors.email = {message:"Invalid Email"}
        if(!data.email.trim()) errors.email = {message:"Please enter an email"}
        if(!data.username.trim()) errors.username = {message:"Please enter an username"}
        if(!data.phone.trim()){ 
            errors.phone = {message:"Please enter an phone number"}
        }else{
            if(!phoneExp.test(data.phone)) errors.phone = {message:"Invalid phone number"}
        }
        if(!data.deviceID.trim()){ 
            errors.deviceID = {message:"Please enter an device ID"}
        }else{
            if(!devExp.test(data.deviceID)) errors.deviceID = {message:"Invalid device ID"}
        }
        if(!data.deviceName.trim()) errors.deviceName = {message:"Please enter an name for you device"}
        
        return errors;
    }

    render(){
        const {data, error, loading} = this.state;
        
        return(
            <Form loading={loading.toString()} onSubmit={e => this.onSubmit(e)}>
                <BorderDiv>
                <h3>Your Info</h3>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            {error.global && (
                                <Alert variant="danger">
                                    <Alert.Heading>Something Failed! :(</Alert.Heading>
                                    <p>{error.global}</p>
                                </Alert>
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 1 }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" id="email" name="email" placeholder="example@email.com" value={data.email} onChange={this.onChange}/>
                            {error.email && (
                                <InlineError message={error.email.message} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" id="username" name="username" placeholder="username" value={data.username} onChange={this.onChange}/>
                            {error.username && (
                                <InlineError message={error.username.message} />
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
                            <Form.Control type="password" id="password" name="password" placeholder="password" value={data.password} onChange={this.onChange}/>
                            {error.password && (
                                <InlineError message={error.password.message} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" id="passwordCfrm" name="passwordCfrm" placeholder="password" value={data.passwordCfrm} onChange={this.onChange}/>
                            {error.password && (
                                <InlineError message={error.password.message} />
                            )}
                        </Col>
                    </Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <br/>
                        <hr/>
                    </Col>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Label>Mobile Phone NO.</Form.Label>
                            <Form.Control type="text" id="phone" name="phone" placeholder="07123456789" value={data.phone} onChange={this.onChange}/>
                            {error.phone && (
                                <InlineError message={error.phone.message} />
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
                            <br/>
                            {error.deviceID && (
                                <InlineError message={error.deviceID.message} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Device Name</Form.Label>
                            <Form.Control type="text" id="deviceName" name="deviceName" placeholder="Kitchen Herbs" value={data.deviceName} onChange={this.onChange}/>
                            <Form.Label>The name you will associate with this device</Form.Label>
                            <br/>
                            {error.deviceName && (
                                <InlineError message={error.deviceName.message} />
                            )}
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <h3>Contact Info</h3>
                    <Form.Label>How would you like the system to send you alerts?</Form.Label>
                    <Row>
                            <Col md={{ span: 1, offset: 4 }} onClick={() =>this.onContactChange({target:{name:"email"}})}>
                                <CenterDiv>
                                    <Form.Check type="radio" label="Email" id="email" checked={data.contact==="email"}/>
                                </CenterDiv>
                            </Col>
                            <Col md={{ span: 1, offset: 2 }} onClick={() =>this.onContactChange({target:{name:"phone"}})}>
                                <CenterDiv>
                                    <Form.Check type="radio" label="Phone" id="phone" checked={data.contact==="phone"}/> 
                                </CenterDiv>
                            </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <br/>
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