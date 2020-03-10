import React from 'react';
import PropType from "prop-types";
import { connect } from "react-redux";
import Styled from "styled-components";

import {confirm} from '../../actions/auth'

class  ConfirmEmailPage extends React.Component{

    constructor() {
        super();
        this.state = {
            confirmed: false,
            loading: true
        };
      }

    componentDidMount(){
        this.props.confirm(this.props.match.params.token).then(()=>{
            this.setState({loading:false, confirmed: true})
        })
        .catch(err =>{
            this.setState({loading:false})
        })
    }

    render(){
        var {loading, confirmed} = this.state;
        const CenterDiv = Styled.div`
            text-align: center;
        `;

        return(
            <CenterDiv>
                <h4>Thank you for confirming your email</h4>
                {loading && <div><h5>Confirming...</h5></div>}
                {!loading && confirmed && <div><h5>Your Email has been confirmed!</h5></div>}
            </CenterDiv>
        )
    }
}

ConfirmEmailPage.PropType = {
    user : PropType.shape({
    email: PropType.string.isRequired,
    username: PropType.string.isRequired,
    email_confirm: PropType.bool.isRequired,
    token: PropType.string.isRequired  
    }),
    confirm: PropType.func.isRequired
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}


export default connect(mapStateToProps, {confirm})(ConfirmEmailPage);