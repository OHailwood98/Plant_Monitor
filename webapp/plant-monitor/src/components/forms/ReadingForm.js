import React from "react"
import Styled from "styled-components";
import { Alert, Form, Col, Row } from "react-bootstrap";

import api from "../../api"
import ReadingDisplayForm from "../forms/ReadingDisplayForm"

const BorderDiv = Styled.div`
    display: inline-block;
    width:98%;
    border-style: solid;
    border-width: 3px;
    border-radius: 2px;
    padding: 25px;
    border-color: #28a745;
`;

class ReadingForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            devices: props.devices,
            readings:{},
            loading:true,
            chosenDevice:props.devices[0].devID,
            chosenPeriod:0,
            error:{}
        }
        this.onChange = this.onChange.bind(this);
        this.onPeriodChange = this.onPeriodChange.bind(this);
    }

    onChange(event){
        console.log("hi")
        const {name, value} = event.target
        this.setState({...this.state, [name]: value});
    }

    onPeriodChange(event){
        const {name, value} = event.target
        this.setState({...this.state, [name]: value, loading:true});
        this.getReadings(this.state.devices[0].devID, value)
    }

    componentDidMount(){
        this.getReadings(this.state.devices[0].devID, "0")
    }

    getReadings(id, period){
        console.log(period)
        switch(period){
            case "0":
                api.reading.getOneDay(id)
                .then(timeList =>{
                    this.setState({...this.state, readings: timeList, loading:false})
                })
                .catch(err => {
                    this.setState({...this.state, error:err.response.data.errors, loading:false});
                })
                break;
            case "1":
                api.reading.getOneWeek(id)
                .then(timeList =>{
                    this.setState({...this.state, readings: timeList, loading:false})
                })
                .catch(err => {
                    this.setState({...this.state, error:err.response.data.errors, loading:false});
                })
                break;
            default:
                api.reading.getOneMonth(id)
                .then(timeList =>{
                    this.setState({...this.state, readings: timeList, loading:false})
                })
                .catch(err => {
                    this.setState({...this.state, error:err.response.data.errors, loading:false});
                })
        }
    }

    render(){
        const {devices, loading, chosenDevice, chosenPeriod, readings, error} = this.state;

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
                                <Form.Label>Devices</Form.Label>
                                <Form.Control as="select" id="chosenDevice" name="chosenDevice" value={chosenDevice} onChange={this.onChange}>
                                    {deviceList}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={{ span: 2, offset: 0 }}>
                            <Form.Group>
                                <Form.Label>Devices</Form.Label>
                                <Form.Control as="select" id="chosenPeriod" name="chosenPeriod" value={chosenPeriod} onChange={this.onPeriodChange}>
                                    <option value={0}>One Day</option>
                                    <option value={1}>One Week</option>
                                    <option value={2}>One Month</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                {!loading ?
                (<ReadingDisplayForm readings={readings.slice(0,4)}/>):
                (<h3>loading</h3>)
                }
            </BorderDiv>
        )
    }


}

export default ReadingForm