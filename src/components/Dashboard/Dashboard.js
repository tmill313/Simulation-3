import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            users: [],
            filter: '',
            loggedUser: {}
        }

        this.filterFriends=this.filterFriends.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/getAllFriends').then(res => {
            this.setState({
                users: res.data
            })
        })
        axios.get('/auth/me').then(res => {
                this.setState({
                    loggedUser: res.data
                })
            })
    }

    filterFriends() {
        axios.get(`/getFriends/${this.state.filter}`).then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    handleChange(e) {
        this.setState({
            filter: e.target.value
        })
    }

    render() {
        let friends = this.state.users.map(obj => (
            <div>
                <h1>{obj.first_name} {obj.last_name}</h1>
                <h1>do you like basketball? {obj.hobby}</h1>
            </div>
        ))
        return (
            <div>
                <p>Welcome {this.state.loggedUser.first_name}</p>
                <h1>Dashboard</h1>
                <Link to='/update'><button>Update profile</button></Link>
                <Link to='/search'><button>Search</button></Link>
                <a href='http://localhost:3030/auth/logout'><button>Log out</button></a>

                <select value={this.state.filter} onChange={this.handleChange}>
                    <option value="null">filter</option>
                    <option value="yes">Yes</option>
                    <option value="no">Hell nah</option>
                </select>
                <button onClick={() => this.filterFriends()}>filter</button>

                {friends}
            </div>
        )
    }

}