import React from "react"
import Styled from "styled-components";
import { Alert, Form, Col, Row } from "react-bootstrap";

import api from "../../api"
import RecentReadingForm from "../forms/RecentReadingForm"
import DeviceActionForm from "../forms/DeviceActionForm"

const BorderDiv = Styled.div`
display: inline-block;
width:90%;
border-style: solid;
border-width: 3px;
border-radius: 2px;
padding: 25px;
border-color: #28a745;
`;

class ActionForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            devices: props.devices,
            chosenDevice:props.devices[0].devID,
            chosenName:props.devices[0].name,
            reading:{},
            loading:true,
            error:{}
        }
        this.onChange = this.onChange.bind(this);
        this.getRecentReading = this.getRecentReading.bind(this);
        this.waterPlants = this.waterPlants.bind(this);
    }

    onChange(event){
        const {name, value} = event.target
        var arr = [];
        var devName;
        arr = [].concat(arr, this.state.devices)
        arr.forEach(device =>{
            if(device.devID === value){
                devName = device.name
            }
        })
        this.setState({...this.state, [name]: value, chosenName:devName});
        this.getRecentReading(value)
        
    }

    componentDidMount(){
        this.getRecentReading(this.state.chosenDevice)
    }

    getRecentReading(id){
        api.reading.getMostRecent(id)
            .then(recentTime =>{
                this.setState({...this.state, reading:recentTime, loading:false, error:{}})
            })
            .catch(err =>{
                this.setState({...this.state, error:err.response.data.errors, loading:false, reading:{}});
            })
    }

    waterPlants(){
        api.device.water(this.state.chosenDevice)
    }
    
    render(){
        const {devices, chosenDevice, chosenName, reading, loading, error} = this.state;

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
                {(!loading && reading.deviceID) ?
                    (
                    <div>
                        <RecentReadingForm reading={reading} name={chosenName}/>
                    </div>):
                    (<BorderDiv><h3>Recent Reading Failed to load</h3></BorderDiv>)
                }
                <br/>
                <br/>
                <DeviceActionForm water={this.waterPlants}/>
            </BorderDiv>
        )
    }

}

export default ActionForm;