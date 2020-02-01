import React from "react";
import Styled from "styled-components";
import MediaQuery from "react-responsive";

import {Navbar, Col} from "react-bootstrap"

function MainFooter(){
    const PaddedDiv = Styled.div`
        padding-top:60px
    `
    const CenterDiv = Styled.div`
        text-align: center;
    `;

    const BackgroundDiv = Styled.div`
        background-color: #2A9FD6 
    `;
    
    const WhiteDiv = Styled.div`
        display: inline-block;
        width: 95%
        margin: 10px 0px 5px
    `;

    return(
        <PaddedDiv>
            <BackgroundDiv>
                <CenterDiv>
                    <WhiteDiv>
                    <MediaQuery minDeviceWidth={768}>
                        <h4>
                            <a style={{color: "#ADAFAE"}} href="https://www.brandshatch.co.uk/" rel="noopener noreferrer" target="_blank">
                                Brands Hatch Main Site: https://www.brandshatch.co.uk/
                            </a>
                        </h4>
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth={767}>
                        <h5>
                            <a style={{color: "#ADAFAE"}} href="https://www.brandshatch.co.uk/" rel="noopener noreferrer" target="_blank">
                                Brands Hatch Main Site: https://www.brandshatch.co.uk/
                            </a>
                        </h5>
                    </MediaQuery> 
                    </WhiteDiv>
                </CenterDiv>
                    <Navbar bg="primary" variant="dark">
                        <Col md={{ span: 4, offset: 1 }}>
                            <CenterDiv>
                                <p>Contact Us: <a style={{color: "#ADAFAE"}} href="mailto:admin@brandshatchtimer.com">admin@brandshatchtimer.com</a></p>
                            </CenterDiv>
                        </Col>
                        <MediaQuery minDeviceWidth={768}>
                        <Col md={{ span: 4, offset: 1 }}>
                            <CenterDiv>
                                <p>Disclaimer</p>
                                <p>This site is in no way associated with Brands Hatch or MotorSport Vision</p>
                            </CenterDiv>
                        </Col>
                        </MediaQuery> 
                    </Navbar>
            </BackgroundDiv> 
        </PaddedDiv>
    );
}

export default MainFooter