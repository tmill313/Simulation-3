import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Login extends Component {
constructor() {
    super();
}

render() {
    return(
        <div>
            <a href={ process.env.REACT_APP_LOGIN }><button>Login</button></a>
        </div>
    )
}

}