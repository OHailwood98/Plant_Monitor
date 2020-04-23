import React from "react"
import Styled from "styled-components";
import { Alert, Form, Col, Row } from "react-bootstrap";

import api from "../../api"

class DeviceForm extends React.Component{

    constructor(props){
        super()
        this.state = {
            devices: props.devices,
            loading:true,
            chosenDevice: props.devices[0].devID,
            error:{}
        }
        this.onChange = this.onChange.bind(this);
        this.getDeviceInfo = this.getDeviceInfo.bind(this);
    }

    onChange(event){
        const {name, value} = event.target
        this.setState({...this.state, [name]: value});
        console.log(value)
        this.getDeviceInfo(value)
    }

    componentDidMount(){
        this.getDeviceInfo(this.state.devices[0].devID)
    }

    getDeviceInfo(id){
        api.device.deviceInfo(id)
        .then(device =>{
            this.setState({...this.state, deviceInfo: device, loading: false})
        })
        .catch(err => {
            this.setState({...this.state, error:err.response.data.errors, loading:"false"});
        }) 
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
            border-color: #28a745;
        `;

        let deviceList = this.state.devices.map(dev =>(
            <option value={dev.devID}>{dev.name}</option>
        ))

        return(
            <BorderDiv>
                <Form>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            {this.state.error.global && (
                                <Alert variant="danger">
                                    <Alert.Heading>Something Failed! :(</Alert.Heading>
                                    <p>{this.state.error.global}</p>
                                </Alert>
                            )}
                        </Col>
                        <Col md={{ span: 2, offset: 0 }}>
                            <Form.Group>
                                <Form.Control as="select" id="chosenDevice" name="chosenDevice" value={this.state.chosenDevice} onChange={this.onChange}>
                                    {deviceList}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </BorderDiv>
        )
    }

}

export default DeviceForm