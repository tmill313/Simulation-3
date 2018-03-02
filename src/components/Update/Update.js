import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BasketballUpdate from './BasketballUpdate';
import axios from 'axios';

export default class Upddate extends Component {
    constructor() {
        super();

        this.state = {
            basketball: '',
            user: {}
        }

        this.updateState=this.updateState.bind(this);
        this.submitChanges=this.submitChanges.bind(this);
    }


    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.setState({
                user: res.data
            })
            console.log(this.state.user)
        })
    }
    updateState(e) {

        this.setState({
            basketball: e.target.value
        })
    }

    submitChanges() {
        let body = this.state.basketball
        axios.put(`/updateProfile/${this.state.user.id}&${this.state.basketball}`, body).then(res => {

        })
    }

    render() {
        return (
            <div>
                <h1>Update</h1>
                <Link to='/dashboard'><button>Home</button></Link>
                <BasketballUpdate basketball={this.state.basketball} updateState={this.updateState} submitChanges={this.submitChanges}/>
                <h1>{this.state.basketball}</h1>
            </div>
        )
    }

}