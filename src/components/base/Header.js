import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown,MenuItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { remove_user } from './../../actions/UserAction'

 
class Header extends Component {
    state = {  }

    componentDidMount(){
        console.log('====================================');
        console.log(this.props.user);
        console.log('====================================');
    }

    logout = () =>{
        this.props.remove_user();
        localStorage.removeItem('user');
    }

    render() { 
        return (
            <header>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">My Demo App</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}>
                            <Link to="/"> Home </Link>
                        </NavItem>
                        <NavItem eventKey={2}>
                            <Link to="/about"> About </Link>
                        </NavItem>
                    </Nav>
                    {
                        !this.props.user.token ?
                        <Nav pullRight>
                            <NavItem eventKey={1}>
                                <Link to="/login"> Login </Link>
                            </NavItem>
                            <NavItem eventKey={2}>
                                <Link to="/register"> Register </Link>
                            </NavItem>
                        </Nav>
                        :
                        <Nav pullRight>
                            <NavItem eventKey={1}>
                                <Link to="/user/profile"> Profile </Link>
                            </NavItem>
                            <NavItem eventKey={2}>
                                <a href="#" onClick={this.logout} >Logout</a>
                            </NavItem>
                        </Nav>
                    }
                    
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({  
    user: state.user
});
  
const mapDispatchToProps = { 
    remove_user
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
