import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Search from './components/Search/Search';
import Update from './components/Update/Update';

export default (
    <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/search' component={Search} />
    <Route path='/update' component={Update} />



    </Switch>
)