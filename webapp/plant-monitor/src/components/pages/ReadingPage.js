import React from "react";
import Styled from "styled-components";

import api from "../../api"

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
                console.log(devices)
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
                {!loading ? (<h4>HI</h4>): null}
            </CenterDiv>
        )
    }
}

export default ReadingPage;