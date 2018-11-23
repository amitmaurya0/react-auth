import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import UserIndex from '../pages/user/UserIndex';
import Register from '../pages/Register';
import Header from '../components/base/Header';
import { Grid } from 'react-bootstrap'
import About from '../pages/About';

const MainRoute = () => {
   return(

    <Router>
        <div>
            <Header />
            <Grid>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/login/" component={Login} />
                <Route path="/register/" component={Register} /> 
                <Route path="/user/" component={UserIndex} />
            </Grid>
        </div>

    </Router>
   ) 
}

export default MainRoute;