import React from "react";
import Styled from "styled-components";

import api from "../../api"
import ReadingForm from "../forms/ReadingForm"

const CenterDiv = Styled.div`
text-align: center;
`;

class ReadingPage extends React.Component{
    constructor(){
        super()
        this.state = {
            devices:[],
            loading:true
        }
    }

    componentDidMount(){
        api.user.getDevices()
            .then(devices =>{
                this.setState({...this.state, devices:devices, loading: false})
            })
    }

    render(){
        var {loading, devices} = this.state;
        return(
            <CenterDiv>
                <br/>
                <h2>Readings</h2>
                <br/>
                <br/>
                {!loading ? (<ReadingForm devices={devices}/>): null}
            </CenterDiv>
        )
    }
}

export default ReadingPage;