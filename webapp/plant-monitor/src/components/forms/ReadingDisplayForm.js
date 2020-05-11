import React from "react"
import { Form, Col, Row } from "react-bootstrap";

import LightGraph from "../graphs/LightGraph"
import TempGraph from "../graphs/TempGraph"
import MoistGraph from "../graphs/MoistGraph"

function ReadingDisplayForm(readings){
   return(
       <div>
         <Form>
            <Row>
              <Col md={{ span: 6, offset: 0 }}>
                <LightGraph readings={readings}/>
              </Col>
              <Col md={{ span: 6, offset: 0 }}>
                <TempGraph readings={readings}/>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <MoistGraph readings={readings}/>
              </Col>
            </Row>
         </Form>
         
       </div>
   )
}

export default ReadingDisplayForm