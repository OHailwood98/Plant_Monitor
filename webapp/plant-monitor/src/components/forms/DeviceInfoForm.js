import React from "react"
import Styled from "styled-components";
import { Alert, Form, Col, Row } from "react-bootstrap";

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
    }

    onChange(event){
        const {name, value} = event.target
        this.setState({...this.state, device: {...this.state.device, [name]: value}});
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
                            <br/>
                            {error.deviceID && (
                                <InlineError message={error.deviceID.message} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Device Name</Form.Label>
                            <Form.Control type="text" id="deviceName" name="deviceName" placeholder="Kitchen Herbs" 
                                value={device.deviceName} onChange={this.onChange} readOnly={readOnly}/>
                            <br/>
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
                            <br/>
                            {error.tempMin && (
                                <InlineError message={error.tempMin.message} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Maximum Temperature</Form.Label>
                            <Form.Control type="text" id="tempMax" name="tempMax" placeholder="Degrees C" 
                                value={device.tempMax} onChange={this.onChange} readOnly={readOnly}/>
                            <br/>
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
                            <br/>
                            {error.moistMin && (
                                <InlineError message={error.moistMin.message} />
                            )}
                        </Col>
                        <Col md={{ span: 4, offset: 2 }}>
                            <Form.Label>Maximum Moisture</Form.Label>
                            <Form.Control type="text" id="moistMax" name="moistMax" placeholder="5-90" 
                                value={device.moistMax} onChange={this.onChange} readOnly={readOnly}/>
                            <br/>
                            {error.moistMax && (
                                <InlineError message={error.moistMax.message} />
                            )}
                        </Col>
                    </Row>
                </Form>
            </BorderDiv>
        )
    }
}

export default DeviceInfoForm