import React, { Component } from 'react';
import { ButtonGroup, Button, Row, Col, FormGroup, ControlLabel, Alert } from 'react-bootstrap'
import { register } from '../api/userauth';
import { connect } from 'react-redux';
import { add_user } from './../actions/UserAction'
import { Form, Field } from 'react-final-form';
import { Redirect } from 'react-router-dom';
const objectToFormData = require('object-to-formdata')


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            stepOne: true,
            stepTwo: false,
            stepThree: false,
            selectedFile: '',
            fileSelected: false,
            error: '',
            displayImage:'',
        }
    }

    handleselectedFile = event => {
        this.setState({
            ...this.state,
            selectedFile: event.target.files[0],
            fileSelected:  true,
        })
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({...this.state, displayImage: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
      }


    onSubmit = (item) =>{
        const formData = objectToFormData(item)
        formData.append('image', this.state.selectedFile, this.state.selectedFile.name)
        this.setState({...this.state, error: '', loading: true});
        register(formData).then( async res=>{
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

    activeStep = (active) =>{
        if(active == 1){
            this.setState({...this.state, stepOne: true, stepTwo: false, stepThree: false})
        }else if( active == 2){
            this.setState({...this.state, stepOne: false, stepTwo: true, stepThree: false})
        }else{
            this.setState({...this.state, stepOne: false, stepTwo: false, stepThree: true})
        }
    }

    render() {
        const { loading, stepOne, stepTwo, stepThree, error, selectedFile, displayImage } = this.state;
        if(this.props.user.token){
            return <Redirect to={{ pathname: '/user/profile' }} />
        }
        return (
            <div>
                
                <Row>
                    <Col xs={12} md={6} mdOffset={3} >
                        <ButtonGroup style={{width: '100%'}}>
                            <Button bsStyle={ stepOne ? 'primary' : 'default' } style={{width: '33.33%'}}> Personal Detail </Button>
                            <Button bsStyle={ stepTwo ? 'primary' : 'default' } style={{width: '33.33%'}}> Image </Button>
                            <Button bsStyle={ stepThree ? 'primary' : 'default' } style={{width: '33.33%'}}>  Credentials </Button>
                        </ButtonGroup>
                        <hr />
                    </Col>
                    
                    <Col xs={12} md={6} mdOffset={3} >
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
                                    <div style={{ display: stepOne ? 'block' : 'none' }}>
                                        <FormGroup controlId="formBasicText">
                                            <ControlLabel>First Name</ControlLabel>
                                            <Field className="form-control" name="first_name" component="input" placeholder="First Name" />
                                        </FormGroup>
                                        <FormGroup controlId="formBasicText">
                                            <ControlLabel>Last Name</ControlLabel>
                                            <Field className="form-control" name="last_name" component="input" placeholder="Last Name" />
                                        </FormGroup>
                                        <FormGroup controlId="formBasicText">
                                            <ControlLabel>Address</ControlLabel>
                                            <Field className="form-control" name="address" component="input" placeholder="address" />
                                        </FormGroup>
                                        <FormGroup controlId="formBasicText">
                                            <ControlLabel>City</ControlLabel>
                                            <Field className="form-control" name="city" component="input" placeholder="City" />
                                        </FormGroup>
                                        <Button type="button" pullRight onClick={()=>this.activeStep(2)} >
                                            Next
                                        </Button>
                                    </div>
                                    <div style={{ display: stepTwo ? 'block' : 'none' }}>
                                        <FormGroup controlId="formBasicText">
                                            <ControlLabel>Image</ControlLabel>
                                            <input type="file" name="image" id="" onChange={this.handleselectedFile} />
                                            {
                                                selectedFile ?
                                                <img src={displayImage} style={{height: '150px', width: '150px'}} />
                                                :
                                                ''
                                            }
                                        </FormGroup>
                                        
                                        <Button type="button" pullLeft onClick={()=>this.activeStep(1)} > 
                                            Back
                                        </Button>
                                        <Button type="button" pullRight onClick={()=>this.activeStep(3)} > 
                                            Next
                                        </Button>
                                    </div>
                                    <div style={{ display: stepThree ? 'block' : 'none' }}>
                                        <FormGroup controlId="formBasicText">
                                            <ControlLabel>Email</ControlLabel>
                                            <Field className="form-control" name="email" component="input" placeholder="Email" />
                                        </FormGroup>
                                        <FormGroup controlId="formBasicText">
                                            <ControlLabel>Password</ControlLabel>
                                            <Field className="form-control" name="password" component="input" placeholder="Password" />
                                        </FormGroup>
                                        <Button type="button" pullLeft onClick={()=>this.activeStep(2)} > 
                                            Back
                                        </Button>
                                        <Button type="submit" bsStyle="primary" disabled={loading}>
                                            Submit
                                        </Button>
                                    </div>
                                </form>

                            )}
                        />
                    </Col>
                </Row>
                
                
            </div>
        );
    }
}


const mapStateToProps = (state) => ({  
    user: state.user
});
  
const mapDispatchToProps = { 
    add_user
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)