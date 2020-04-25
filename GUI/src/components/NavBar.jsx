import React from 'react';
import { Menu, Dropdown, Segment } from "semantic-ui-react";
import { connect } from 'react-redux';
import '../App.css'
import AuthModal from '../auth/AuthModal';
import { setShowAuthModal, setIsLoggedIn } from '../auth/authSlice';
import logo from '../logo.svg'
import LogoutModal from '../auth/LogoutModal';
import { Link, withRouter } from 'react-router-dom';

function mapStateToProps(state){
  const isLoggedIn = state.auth.isLoggedIn
  const isAdmin = state.auth.isAdmin
  return {
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin
  }
}

class NavBar extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      authType: 'login',
      showLogoutModal: false
    }
  }

  handleDropdownClick = (event, {name}) => {
    if( name === "login" || name === "register"){
      this.props.dispatch(setShowAuthModal({type:name, show:true}))
    }
    if( name === "logout"){
      this.toggleLogoutModal()
    }
  }

  handleLogout = () => {
    this.props.dispatch(setIsLoggedIn(false));
    this.props.history.push('/about')
  }

  toggleLogoutModal = () => {
    this.setState({
      showLogoutModal: !this.state.showLogoutModal,
    })
  }

  LoginDropdownMenu = () => {
    return(
      <Dropdown icon="user" text="User">
        <Dropdown.Menu>
          <Dropdown.Item name="login" text="Login" onClick={this.handleDropdownClick}/>
          <Dropdown.Item name="register" text="Register" onClick={this.handleDropdownClick}/>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  LogoutDropdownMenu = () => {
    return(
      <Dropdown icon="user" text="User">
        <Dropdown.Menu>
          <Dropdown.Item name="account" text="Account" 
              as={Link}
              to="/account" 
              onClick={this.handleDropdownClick}/>
          <Dropdown.Item name="logout" text="Logout" onClick={this.handleDropdownClick}/>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  render(){
    var AuthMenu = this.props.isLoggedIn?(<this.LogoutDropdownMenu/>):(<this.LoginDropdownMenu/>);
    var PostsButton = this.props.isAdmin?(
      <Dropdown item text="Posts">
        <Dropdown.Menu>
          <Dropdown.Item icon="user" text="My posts" as={Link} to="/posts/me"/>
          <Dropdown.Item icon="globe" text="Unverified posts" as={Link} to="/posts/unverified"/>
        </Dropdown.Menu>
      </Dropdown>
    ):(
    <Menu.Item
      name="Posts"
      active={ document.location.pathname === "/posts/me" }
      to="/posts/me"
      as={Link}
    />)
    return(
      <>
        <Segment inverted>
          <Menu pointing secondary inverted>
            <img src ={logo} alt="Believe" width="45" height="45" className="AppLogo" floated="left"/>
            <Menu.Item
              name="feed"
              active={ document.location.pathname === "/" }
              as={Link}
              to=""
            />
            <Menu.Item
              name="about"
              active={ document.location.pathname === "/about" }
              as={Link}
              to="/about"
            />
            {PostsButton}
            <Menu.Menu secondary position="right">
              <Menu.Item>
                {AuthMenu}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>
        <AuthModal type={this.state.authType}/>
        <LogoutModal show={this.state.showLogoutModal} handleClose={this.toggleLogoutModal} handleLogout={this.handleLogout}/>
      </>
    )
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))