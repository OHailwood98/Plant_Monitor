import React from "react"
import Styled from "styled-components";
import { Form, Col, Row, Button } from "react-bootstrap";

const BorderDiv = Styled.div`
    display: inline-block;
    width:90%;
    border-style: solid;
    border-width: 3px;
    border-radius: 2px;
    padding: 25px;
    border-color: #28a745;
`;

const CenterDiv = Styled.div`
    text-align: center;
`;

function DeviceActionForm(props){

    return(
        <BorderDiv>
            <Form>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <CenterDiv>
                            <h3>Actions</h3>
                        </CenterDiv>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <CenterDiv>
                            <Button variant="primary" size="lg" block onClick={e => props.water()}>Water Plants</Button>
                        </CenterDiv>
                    </Col>
                </Row>
            </Form>
        </BorderDiv>
    )
}

export default DeviceActionForm;