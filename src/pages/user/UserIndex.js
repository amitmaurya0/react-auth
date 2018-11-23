import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Profile from './Profile';
import Header from '../../components/base/Header';

export default class UserIndex extends Component {

    constructor(props){
        super(props)
        this.state = {
            login: false,
            loading: true,
        }
    }

    componentWillMount(){
        this.checkLogin();
    }

    checkLogin = async () => {
        let token = await localStorage.getItem('user');
      
        if(token == null){
            this.setState({...this.state, loading: false})
        }else{
            this.setState({...this.state, loading: false, login:true})
        }
    }

    render() {
        if(this.state.loading){
            return <div>Loading</div>
        }
        if(this.state.login){
            return (
                <Router>
                    <div>
                        <Route path="/" component={Profile} />
                    </div>
                </Router>
            );
        }else{
            return (
                <Redirect to={{ pathname: '/login' }} />
            )
        }
    }
}