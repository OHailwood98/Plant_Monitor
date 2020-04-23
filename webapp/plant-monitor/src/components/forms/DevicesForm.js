import React from "react"
import Styled from "styled-components";
import { Form, Col } from "react-bootstrap";

class DeviceForm extends React.Component{

    constructor(props){
        super()
        this.state = {
            devices: props.devices,
            loading:true,
            chosenDevice: props.devices[0].devID
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        const {name, value} = event.target
        this.setState({...this.state, [name]: value});
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
                    <Col md={{ span: 2, offset: 0 }}>
                        <Form.Group>
                            <Form.Control as="select" id="chosenDevice" name="chosenDevice" onChange={this.onChange}>
                                {deviceList}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form>
            </BorderDiv>
        )
    }

}

export default DeviceForm