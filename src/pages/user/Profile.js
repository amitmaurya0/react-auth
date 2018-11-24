import React, { Component } from 'react';
import axios from 'axios'
import { urls, ASSET_URL } from '../../api/urls';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:{},
            loading: true
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.post( urls.profile , {}, {
            headers : {
                'Authorization': this.props.user.token
            }
        })
        .then((res) => {
            if(res.data.status){
                this.setState({...this.state, user:res.data.data, loading: false})
            }
        })
        .catch(function (error) {
                return error;
        });
    }
    render() {
        const { user, loading } = this.state;
        if(loading)
            return  <div>Loading...</div>
        return (
            <div>
                <h1>My Profile</h1>
                <p>
                    <strong>Name: </strong> {user.name.first} {user.name.last}
                </p>
                <p>
                    <strong>Address: </strong> {user.address}
                </p>
                <p>
                    <strong>City: </strong> {user.city}
                </p>
                <p>
                    <strong>Email: </strong> {user.email}
                </p>
                <p>
                    <img src={ASSET_URL+user.profileImage} style={{height: '150px', width: '150px'}} />
                </p>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({  
    user: state.user
});

export default connect(mapStateToProps)(Profile)