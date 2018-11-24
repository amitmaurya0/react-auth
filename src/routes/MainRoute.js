import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import UserIndex from '../pages/user/UserIndex';
import Register from '../pages/Register';
import Header from '../components/base/Header';
import { Grid } from 'react-bootstrap'
import About from '../pages/About';
import { connect } from 'react-redux';
import { add_user } from './../actions/UserAction'

class MainRoute extends Component {
    componentWillMount(){
        this.checkLogin();
      }
    
      checkLogin = async () => {
        let user = await localStorage.getItem('user');
      
        if(user == null){
            this.setState({...this.state, loading: false})
        }else{
          user = JSON.parse(user);
          this.props.add_user(user)
          this.setState({...this.state, loading: false, login:true})
        }
      }
    render() {
        return (
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
        );
    }
}



const mapStateToProps = (state) => ({  
    user: state.user
  });
  
  const mapDispatchToProps = { 
    add_user
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainRoute)