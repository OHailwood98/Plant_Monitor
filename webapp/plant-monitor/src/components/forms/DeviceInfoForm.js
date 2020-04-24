import React from "react"
import Styled from "styled-components";
import { Alert, Button, Form, Col, Row } from "react-bootstrap";

import InlineError from "../messages/InlineError"

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

class DeviceInfoForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            device: props.device,
            readOnly: true,
            error:{}
        }
        this.onChange = this.onChange.bind(this)
        this.editClick = this.editClick.bind(this)
        this.submitEdit = this.submitEdit.bind(this)
    }

    onChange(event){
        const {name, value} = event.target
        this.setState({...this.state, device: {...this.state.device, [name]: value}});
    }

    editClick(){
        this.setState({...this.state, readOnly: false, deviceBackUp: this.state.device})
    }

    cancelEdit(){
        this.setState({...this.state, readOnly: true, device: this.state.deviceBackUp, error: {}})
    }

    submitEdit(){
        const errors = this.validate(this.state.device);
        this.setState({error:errors});
        if(Object.keys(errors).length ===0){

        }
    }

    validate(data){
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
        var {error, readOnly, device} = this.state
        
        return(
            <BorderDiv>
                <Form onSubmit={e => this.onSubmit(e)}>
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
                            <Form.Label>Device ID</Form.Label>
                            <Form.Control type="text" id="deviceID" name="deviceID" placeholder="21" 
                                value={device.deviceID} onChange={this.onChange} readOnly/>
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Device Name</Form.Label>
                            <Form.Control type="text" id="deviceName" name="deviceName" placeholder="Kitchen Herbs" 
                                value={device.deviceName} onChange={this.onChange} readOnly={readOnly}/>
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
                            <Form.Label>Minimum Temperature</Form.Label>
                            <Form.Control type="text" id="tempMin" name="tempMin" placeholder="Degrees C" 
                                value={device.tempMin} onChange={this.onChange} readOnly={readOnly}/>
                            {error.tempMin && (
                                <InlineError message={error.tempMin.message} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Maximum Temperature</Form.Label>
                            <Form.Control type="text" id="tempMax" name="tempMax" placeholder="Degrees C" 
                                value={device.tempMax} onChange={this.onChange} readOnly={readOnly}/>
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
                            <Form.Label>Minimum Moisture</Form.Label>
                            <Form.Control type="text" id="moistMin" name="moistMin" placeholder="5-90" 
                                value={device.moistMin} onChange={this.onChange} readOnly={readOnly}/>
                            {error.moistMin && (
                                <InlineError message={error.moistMin.message} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Maximum Moisture</Form.Label>
                            <Form.Control type="text" id="moistMax" name="moistMax" placeholder="5-90" 
                                value={device.moistMax} onChange={this.onChange} readOnly={readOnly}/>
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
                    {readOnly ?
                        (<Row>
                            <Col md={{ span: 4, offset: 4 }}>
                                <Button variant="warning" size="lg" block onClick={e => this.editClick(e)}>Edit Details</Button>
                            </Col>
                        </Row>):
                        (<Row>
                            <Col md={{ span: 2, offset: 3 }}>
                                <Button variant="success" size="lg" block onClick={e => this.submitEdit(e)}>Save</Button>
                            </Col>
                            <Col md={{ span: 2, offset: 2 }}>
                                <Button variant="danger" size="lg" block onClick={e => this.cancelEdit(e)}>Cancel</Button>
                            </Col>
                        </Row>)
                    }
                </Form>
            </BorderDiv>
        )
    }
}

export default DeviceInfoForm