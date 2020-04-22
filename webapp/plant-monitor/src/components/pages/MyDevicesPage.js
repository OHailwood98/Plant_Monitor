import React from "react";
import Styled from "styled-components";

import api from "../../api"
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
                this.setState({...this.state, devices:devices, loading: false})
            })
    }

    render(){
        return(
            <div>
                <h2>My Devices Page</h2>
            </div>
        )
    }

}

export default MyDevicesPage