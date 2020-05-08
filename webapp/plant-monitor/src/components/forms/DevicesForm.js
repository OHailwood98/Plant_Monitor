import React from "react"
import Styled from "styled-components";
import { Alert, Form, Col, Row } from "react-bootstrap";

import api from "../../api"
import DeviceInfoForm from "../forms/DeviceInfoForm"
import NewDeviceForm from "../forms/NewDeviceForm";

class DeviceForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            devices: props.devices,
            loading:true,
            chosenDevice:props.devices[0].devID,
            error:{}
        }
        this.onChange = this.onChange.bind(this);
        this.getDeviceInfo = this.getDeviceInfo.bind(this);
    }

    onChange(event){
        const {name, value} = event.target
        this.setState({...this.state, [name]: value});
        this.getDeviceInfo(value)
    }

    componentDidMount(){
        this.getDeviceInfo(this.state.chosenDevice)
    }

    getDeviceInfo(id){
        api.device.deviceInfo(id)
        .then(device =>{
            this.setState({...this.state, deviceInfo: device, loading: false})
        })
        .catch(err => {
            this.setState({...this.state, error:err.response.data.errors, loading:false});
        }) 
    }

    render(){
        const {devices, loading, chosenDevice, deviceInfo, error} = this.state;
        const BorderDiv = Styled.div`
            display: inline-block;
            width:90%;
            border-style: solid;
            border-width: 3px;
            border-radius: 2px;
            padding: 25px;
            border-color: #28a745;
        `;

        let deviceList = devices.map(dev =>(
            <option key={dev.devID} value={dev.devID}>{dev.name}</option>
        ))

        return(
            <BorderDiv>
                <Form>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            {error.global && (
                                <Alert variant="danger">
                                    <Alert.Heading>Something Failed! :(</Alert.Heading>
                                    <p>{error.global}</p>
                                </Alert>
                            )}
                        </Col>
                        <Col md={{ span: 2, offset: 0 }}>
                            <Form.Group>
                                <Form.Control as="select" id="chosenDevice" name="chosenDevice" value={chosenDevice} onChange={this.onChange}>
                                    {deviceList}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <br/>
                {!loading ?
                    (
                    <div>
                        <DeviceInfoForm device={deviceInfo}/>
                        <br/>
                        <br/>
                        <NewDeviceForm/>
                    </div>):
                    (<BorderDiv><h3>Device Information Failed to load</h3></BorderDiv>)
                }
            </BorderDiv>
        )
    }

}

export default DeviceForm