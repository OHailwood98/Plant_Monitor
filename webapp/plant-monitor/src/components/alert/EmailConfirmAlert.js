import React, { useState } from "react";
import {Alert} from "react-bootstrap";

function EmailConfirmAlert(){
    const [show, setShow] = useState(true);
    if(show){
        return(
            <Alert variant="info" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>You need to confirm your Email</Alert.Heading>
            </Alert>
        )
    }else{
        return(null)
    }
    
}

export default EmailConfirmAlert