import React from "react"
import { Modal, Menu, Segment, Form, Input, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { setShowAuthModal, setIsLoggedIn } from "./authSlice";
import './AuthModal.css'
import { getAccessToken, saveAccessToken, createUserAccount } from "./AuthUtils";

function mapStateToProps(state){
  const showAuthModal = state.auth.showAuthModal;
  return { showAuthModal: showAuthModal.show, type: showAuthModal.type }
}

class AuthModal extends React.Component{
  
  constructor(props){
    super(props);
    this.state = this.initialState();
  }

  initialState = () => { return {
    loading: false,
    email: '',
    password: '',
    loginError: false,
    loginErrorMessage: '',
    loginSuccess: false,
    loginSuccessMessage: '',
    re_password: '',
    emailError: '',
    passwordError: '',
    re_passwordError: '',
    registerError: false,
    registerErrorMessage: ''
  }};

  handleChange = (e, { name, value}) => this.setState({ [name]: value})

  handleMatchPasswords = (e, {name, value}) => {
    const errorMessage = ( value === this.state.password)?'':'Passwords should match';
    this.setState({ [name]: value , re_passwordError: errorMessage})
  }

  handleSubmit = (event) => {
    if(this.props.type === "login"){
      getAccessToken(this.state.email, this.state.password).then((response) => {
        saveAccessToken(response.data.access, response.data.refresh);
        this.handleClose();
        this.props.dispatch(setIsLoggedIn(true));
      }).catch((error) => {
        this.handleLoginError(error.response.data.detail)
      })
    }else if(this.props.type === "register"){
      createUserAccount(this.state.email, this.state.password, this.state.re_password).then((response) => {
        let signUpSuccessState = this.initialState();
        signUpSuccessState.loginSuccess = true;
        signUpSuccessState.loginSuccessMessage = "Account successfully created. Please Login";
        this.setState(signUpSuccessState);
        this.props.dispatch(setShowAuthModal({type:'login',show:true}))
      })
    }
  }

  handleLoginError = (errorMessage) => {
    this.setState({
      loginError: true,
      loginErrorMessage: errorMessage + " Please check your credentials"
    })
  }

  handleClose = () => {
    this.setState(this.initialState());
    this.props.dispatch(setShowAuthModal({type:'login',show:false}))
  }

  handleItemClick = (event, { name }) => {
    this.setState(this.initialState());
    this.props.dispatch(setShowAuthModal({
      type: name,
      show: true
    }))
  }

  LoginForm = () => {
    return(
        <Form 
          error={this.state.loginError}
          success={this.state.loginSuccess}
          onSubmit={this.handleSubmit}
          size="big"
        >
          <Form.Input
            name="email"
            label="Email"
            placeholder="Email address"
            type="email"
            onChange={this.handleChange}
            required
          />
          <Form.Input
            name="password"
            control={Input}
            type="password"
            label="Password"
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
          <br/>
          <Message 
            error
            content={this.state.loginErrorMessage}
          />
          <Message 
            success
            content={this.state.loginSuccessMessage}
          />
          <Form.Button
            size="big"
            content="Submit"
          />
        </Form>
    );
  }

  RegisterForm = () => {
    return(
      <Form 
          error={this.state.registerError} 
          onSubmit={this.handleSubmit}
          size="big"
        >
          <Form.Input
            name="email"
            label="Email"
            placeholder="Email address"
            type="email"
            onChange={this.handleChange}
            error={this.state.emailError?{
              content: this.state.emailError,
              pointing: 'below' 
            }:false}
            required
          />
          <Form.Input
            name="password"
            control={Input}
            type="password"
            label="Password"
            placeholder="Password"
            onChange={this.handleChange}
            error={this.state.passwordError?{
              content: this.state.passwordError,
              pointing: 'below' 
            }:false}
            required
          />
          <Form.Input
            name="re_password"
            control={Input}
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            onChange={this.handleMatchPasswords}
            error={this.state.re_passwordError?{
              content: this.state.re_passwordError,
              pointing: 'below' 
            }:false}
            required
          />
          <br/>
          <Message 
            error
            content={this.state.registerErrorMessage}
          />
          <Form.Button
            size="big"
            content="Submit"
          />
        </Form>
    );
  }

  render(){
    var authForm;
    if(this.props.type === 'login'){
      authForm = <this.LoginForm/>
    }else if(this.props.type === 'register'){
      authForm = <this.RegisterForm />
    }
    return(
      <Modal
        open={this.props.showAuthModal}
        onClose={this.handleClose}
        centered={false}
      >
        <Menu tabular>
          <Menu.Item
            name='login'
            active={this.props.type === 'login'}
            onClick={this.handleItemClick}
            className="authMenu"
          />
          <Menu.Item
            name='register'
            active={this.props.type === 'register'}
            onClick={this.handleItemClick}
            className="authMenu"
          />
        </Menu>
        <Segment attached="bottom">
          {authForm}
        </Segment>
      </Modal>
    )
  }
}

export default connect(mapStateToProps)(AuthModal);