import React from "react";
import Styled from "styled-components";

import api from "../../api"
import DevicesForm from "../forms/DevicesForm"
class MyDevicesPage extends React.Component {

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
                console.log(devices)
                this.setState({...this.state, devices:devices, loading: false})
            })
    }

    render(){
        const CenterDiv = Styled.div`
            text-align: center;
        `;

        return(
            <CenterDiv>
                <br/>
                <h2>My Devices Page</h2>
                <br/>
                {!this.state.loading ? (<DevicesForm devices={this.state.devices}/>) : (null)}
            </CenterDiv>
        )
    }

}

export default MyDevicesPage