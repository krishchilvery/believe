import React from 'react';
import { Menu, Segment, Sticky, Dropdown} from "semantic-ui-react";
import { connect } from 'react-redux';
import '../App.css'
import AuthModal from '../auth/AuthModal';
import { setShowAuthModal, setIsLoggedIn } from '../auth/authSlice';
import logo from '../logo.svg'
import LogoutModal from '../auth/LogoutModal';
import { Link } from 'react-router-dom';

function mapStateToProps(state){
  const isLoggedIn = state.auth.isLoggedIn;
  return { isLoggedIn: isLoggedIn }
}

class NavBar extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      activeItem : 'feed',
      authType: 'login',
      showLogoutModal: false
    }
  }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
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
    
    return(
      <>
      <Sticky>
          <Menu pointing secondary size="big">
            <Menu.Item padding="0px">
              <img src ={logo} alt="Believe"/>
            </Menu.Item>
            <Menu.Item
              name="feed"
              active={ this.state.activeItem === "feed" }
              onClick={ this.handleItemClick }
            />
            <Menu.Item
              name="about"
              active={ this.state.activeItem === "about" }
              onClick={ this.handleItemClick }
            />
            <Menu.Menu secondary position="right">
              <Menu.Item>
                {AuthMenu}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
      </Sticky>
      <AuthModal type={this.state.authType}/>
      <LogoutModal show={this.state.showLogoutModal} handleClose={this.toggleLogoutModal} handleLogout={this.handleLogout}/>
      </>
    )
  }
}

export default connect(mapStateToProps)(NavBar);