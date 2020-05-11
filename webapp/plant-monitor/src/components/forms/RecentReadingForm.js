import React from "react"
import Styled from "styled-components";
import { Form, Col, Row } from "react-bootstrap";
import Moment from 'moment';

const BorderDiv = Styled.div`
display: inline-block;
width:90%;
border-style: solid;
border-width: 3px;
border-radius: 2px;
padding: 25px;
border-color: #28a745;
`;

function RecentReadingForm(props){
    var time = Moment(props.reading.time).format('DD/MM/YYYY, HH:mm')
    return(
        <BorderDiv>
            <Form>
                <h2>Most Recent Reading</h2>
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>
                        <Form.Label>Device ID</Form.Label>
                        <Form.Control type="text" value={props.reading.deviceID} readOnly/>
                    </Col>
                    <Col md={{ span: 4, offset: 2 }}>
                        <Form.Label>Device Name</Form.Label>
                        <Form.Control type="text" value={props.name} readOnly/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md={{ span: 1, offset: 3 }}>
                        <Form.Label>Light</Form.Label>
                        <Form.Control type="text" value={props.reading.light} readOnly/>
                    </Col>
                    <Col md={{ span: 1, offset: 1 }}>
                        <Form.Label>Temperature</Form.Label>
                        <Form.Control type="text" value={props.reading.temperature} readOnly/>
                    </Col>
                    <Col md={{ span: 1, offset: 1 }}>
                        <Form.Label>Moisture</Form.Label>
                        <Form.Control type="text" value={props.reading.moisture} readOnly/>
                    </Col>
                </Row>
                <br/>
                <h6>Reading Taken at: {time}</h6>
            </Form>
        </BorderDiv>
    )
}
 export default RecentReadingForm