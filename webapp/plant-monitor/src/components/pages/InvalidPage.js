import React from 'react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function InvalidPage(){
    return(
        <div>
            <h1>Sorry you can't be there</h1>
            <h2>please login or signup to access the page you wanted</h2>
            <Button as={Link} to= "/">home</Button>
        </div>
    )
}

export default InvalidPage