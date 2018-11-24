import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'
import { FormGroup, ControlLabel, Alert, Row, Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import { login } from '../api/userauth';
import { connect } from 'react-redux';
import { add_user } from './../actions/UserAction'

class Login extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false,
            login: false
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

    onSubmit = (item) =>{
        
       
        let user = { email: item.email, password: item.password };
        this.setState({...this.state, error: '', loading: true});
        login(user).then( async res=>{
          if(res.status){
                let user = { token: res.token, name: {first:res.name, last: res.last}, email: res.email };
                await localStorage.setItem('user', JSON.stringify(user));
                this.props.add_user(user)
                this.setState({...this.state, login: true});
          }else{
              this.setState({...this.state, error: res.msg, loading: false});
          }
        }).catch(err=>{
            console.log('====================================');
            console.log('Error:', err);
            console.log('====================================');
        })
    }

    render() {
        const { error, loading, login } = this.state;
        if(login){
            return <Redirect to={{ pathname: '/user/profile' }} />
        }
        return (
            <Row>
                <Col xs={12} md={6} mdOffset={3} >
                    <h1 style={{ textAlign: 'center' }} >Login</h1>
                    {
                        error ? <Alert bsStyle="danger">
                                    <strong>Error!</strong> {error}
                                </Alert>
                            :
                            <p></p>
                    }
                    <Form
                    onSubmit={this.onSubmit}
                    render={({ handleSubmit, pristine, invalid }) => (
        
                        <form onSubmit={handleSubmit}>
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Email</ControlLabel>
                                <Field className="form-control" name="email" component="input" placeholder="Email" />
                            </FormGroup>
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Password</ControlLabel>
                                <Field className="form-control" name="password" component="input" placeholder="Password" />
                            </FormGroup>
                            <Button type="submit" bsStyle="primary" disabled={pristine || invalid || loading}>
                                Submit
                            </Button>
                        </form>
                    )}
                />
                </Col>
            </Row>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({  
    user: state.user
});
  
const mapDispatchToProps = { 
    add_user
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
