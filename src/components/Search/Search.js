import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            users: [],
            filter: '',
            search: ''
        }

        this.searchFriends=this.searchFriends.bind(this);
        this.handleFilterChange=this.handleFilterChange.bind(this);
        this.handleSearchChange=this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        axios.get('/getAllFriends').then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    searchFriends() {
        axios.get(`/searchFriends/${this.state.filter}&${this.state.search}`).then(res => {
            this.setState({
                users: res.data
            })
            console.log(this.state.users)
        })
    }

    handleFilterChange(e) {
        this.setState({
            filter: e.target.value
        })
    }

    handleSearchChange(e) {
        this.setState({
            search: e.target.value
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
                <h1>Dashboard</h1>
                <Link to='/update'><button>Update profile</button></Link>
                <Link to='/search'><button>Search</button></Link>

                <select value={this.state.filter} onChange={this.handleFilterChange}>
                    <option value="null">filter</option>
                    <option value="first_name">First name</option>
                    <option value="last_name">Last name</option>
                </select>
                <input onChange={this.handleSearchChange}></input>
                <button onClick={() => this.searchFriends()}>filter</button>


                {friends}
            </div>
        )
    }

}