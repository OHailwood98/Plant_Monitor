import React from "react"
import Styled from "styled-components";
import { Alert, Button, Form, Col, Row } from "react-bootstrap";

import InlineError from "../messages/InlineError"
import api from "../../api"

const BorderDiv = Styled.div`
    display: inline-block;
    width:95%;
    border-style: solid;
    border-width: 3px;
    border-radius: 2px;
    padding: 25px;
    text-align: left;
    border-color: #79f996;
`;

const CenterDiv = Styled.div`
text-align: center;
`;

class NewDeviceForm extends React.Component{

    constructor(){
        super()
        this.state = {
            newDevice: {},
            adding: false,
            error:{}
        }
        this.onChange = this.onChange.bind(this)
        this.addClick = this.addClick.bind(this)
        this.addDevice = this.addDevice.bind(this)
        this.cancelAdd = this.cancelAdd.bind(this)
    }

    onChange(event){
        const {name, value} = event.target
        this.setState({...this.state, newDevice: {...this.state.newDevice, [name]: value}});
    }

    addClick(){
        this.setState({...this.state, adding: true})
    }

    cancelAdd(){
        this.setState({...this.state, adding: false, newDevice: {}, error: {}})
    }

    addDevice(){
        const errors = this.validate(this.state.newDevice);
        this.setState({error:errors});
        if(Object.keys(errors).length ===0){
            api.device.addDevice(this.state.newDevice)
                .then(() =>{
                    window.location.reload(true)
                })
                .catch(err =>{
                    this.setState({...this.state, error:err.response.data.errors})
                })
        }
    }

    validate(data){
        console.dir(data)
        var error = {}
        var tempReg = new RegExp("^(50|[1-4][0-9]|[5-9]|0)$")
        var moistReg = new RegExp("^(90|[1-8][0-9]|0)$")

        if(!((data.tempMin==="0") && (data.tempMax==="0"))){
            if(data.tempMin===data.tempMax){
                error.tempMin = {message: "Min and Max cannot be equal"}
                error.tempMax = {message: "Min and Max cannot be equal"}
            }
        }

        if(!((data.moistMin==="0") && (data.moistMax==="0"))){
            if(data.moistMin===data.moistMax){
                error.moistMin = {message: "Min and Max cannot be equal"}
                error.moistMax = {message: "Min and Max cannot be equal"}
            }
        }

        if(!data.deviceName.trim()) error.deviceName = {message: "Please Enter a Name"}
        if(!data.tempMin.trim()){
             error.tempMin = {message: "Please Enter a Value"}
        }else{
            if(!tempReg.test(data.tempMin)) error.tempMin = {message: "Please Enter a Number between 5-50"}
        }
        if(!data.tempMax.trim()){ 
            error.tempMax = {message: "Please Enter a Value"}
        }else{
            if(!tempReg.test(data.tempMax)) error.tempMax = {message: "Please Enter a Number between 5-50"}
        }
        if(!data.moistMin.trim()) {
            error.moistMin = {message: "Please Enter a Value"}
        }else{
            if(!moistReg.test(data.moistMin)) error.moistMin = {message: "Please Enter a Number between 10-90"}
        }
        if(!data.moistMax.trim()) {
            error.moistMax = {message: "Please Enter a Value"}
        }else{
            if(!moistReg.test(data.moistMax)) error.moistMax = {message: "Please Enter a Number between 10-90"}
        }

        return error
    }

    render(){
        var {error, adding, newDevice} = this.state
        return(
                <BorderDiv>
                    {!adding ? 
                        (<Row>
                            <Col md={{ span: 4, offset: 4 }}>
                                <Button variant="warning" size="lg" block onClick={e => this.addClick(e)}>Add Device</Button>
                            </Col>
                        </Row>)
                        :                
                        (<Form onSubmit={e => this.onSubmit(e)}>
                        <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                                {error.global && (
                                    <Alert variant="danger">
                                        <Alert.Heading>Something Failed! :(</Alert.Heading>
                                        <p>{error.global}</p>
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 4, offset: 1 }}>
                                <Form.Label>newDevice ID</Form.Label>
                                <Form.Control type="text" id="deviceID" name="deviceID" placeholder="21" 
                                    value={newDevice.deviceID} onChange={this.onChange} />
                                {error.deviceID && (
                                    <InlineError message={error.deviceID.message} />
                                )}
                            </Col>
                            <Col md={{ span: 4, offset: 2 }}>
                                <Form.Label>newDevice Name</Form.Label>
                                <Form.Control type="text" id="deviceName" name="deviceName" placeholder="Kitchen Herbs" 
                                    value={newDevice.deviceName} onChange={this.onChange}/>
                                {error.deviceName && (
                                    <InlineError message={error.deviceName.message} />
                                )}
                            </Col>
                        </Row>
                        <br/>
                        <CenterDiv>
                            <h3>-Temperature-</h3>
                        </CenterDiv>
                        <br/>
                        <Row>
                            <Col md={{ span: 4, offset: 1 }}>
                                <Form.Label>Minimum</Form.Label>
                                <Form.Control type="text" id="tempMin" name="tempMin" placeholder="Degrees C" 
                                    value={newDevice.tempMin} onChange={this.onChange}/>
                                {error.tempMin && (
                                    <InlineError message={error.tempMin.message} />
                                )}
                            </Col>
                            <Col md={{ span: 4, offset: 2 }}>
                                <Form.Label>Maximum</Form.Label>
                                <Form.Control type="text" id="tempMax" name="tempMax" placeholder="Degrees C" 
                                    value={newDevice.tempMax} onChange={this.onChange}/>
                                {error.tempMax && (
                                    <InlineError message={error.tempMax.message} />
                                )}
                            </Col>
                        </Row>
                        <br/>
                        <CenterDiv>
                            <h3>-Soil Moisture-</h3>
                        </CenterDiv>
                        <br/>
                        <Row>
                            <Col md={{ span: 4, offset: 1 }}>
                                <Form.Label>Minimum</Form.Label>
                                <Form.Control type="text" id="moistMin" name="moistMin" placeholder="5-90" 
                                    value={newDevice.moistMin} onChange={this.onChange}/>
                                {error.moistMin && (
                                    <InlineError message={error.moistMin.message} />
                                )}
                            </Col>
                            <Col md={{ span: 4, offset: 2 }}>
                                <Form.Label>Maximum</Form.Label>
                                <Form.Control type="text" id="moistMax" name="moistMax" placeholder="5-90" 
                                    value={newDevice.moistMax} onChange={this.onChange}/>
                                {error.moistMax && (
                                    <InlineError message={error.moistMax.message} />
                                )}
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <CenterDiv>
                            <h6>Setting both min and max to 0 will disable alerts on this variable</h6>
                        </CenterDiv>
                        <br/>
                        <br/>

                            <Row>
                                <Col md={{ span: 2, offset: 3 }}>
                                    <Button variant="success" size="lg" block onClick={e => this.addDevice(e)}>Add</Button>
                                </Col>
                                <Col md={{ span: 2, offset: 2 }}>
                                    <Button variant="danger" size="lg" block onClick={e => this.cancelAdd(e)}>Cancel</Button>
                                </Col>
                            </Row>
                    </Form>)
                }
            </BorderDiv>
        )
    }

}

export default NewDeviceForm;