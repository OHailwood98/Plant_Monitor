import React from "react";
import Styled from "styled-components";

import api from "../../api"
import ActionForm from "../forms/ActionForm"

const CenterDiv = Styled.div`
    text-align: center;
`;

class ActionPage extends React.Component{
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
        return(
            <CenterDiv>
                <br/>
                <h2>Device Action Page</h2>
                <br/>
                {!this.state.loading ? (<ActionForm devices={this.state.devices}/>) : (null)}
            </CenterDiv>
        )
    }
}

export default ActionPage