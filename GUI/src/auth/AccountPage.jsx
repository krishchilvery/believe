import React from "react";
import { connect } from "react-redux";
import { Message, Form, Segment, Input, Button } from "semantic-ui-react";
import { getUserProfile, changeUserProfile } from "./AuthUtils";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  const isLoggedIn = state.auth.isLoggedIn;
  return {
    isLoggedIn: isLoggedIn,
  } 
}

class AccountPage extends React.Component{
  //TODO Implement ChangeModal
  //TODO Implement Error
  constructor(props){
    super(props)
    this.state = this.initialState
    this.getProfileData();
  }

  initialState = {
      email: "",
      authFormDisabled: true,
      authFormLoading: true,
      first_name: "",
      last_name: "",
      designation: "",
      location: "",
      profileFormDisabled: true,
      profileFormLoading: true,
      profileFormSuccess:false,
      refreshMessage: false,
      authUpdate: false
  }

  componentDidMount = ()=>{
    if(this.props.isLoggedIn){
      this.getProfileData();
    }
  }

  getProfileData = () => {
    console.log("called")
    getUserProfile().then((response) => {
      let data = this.initialState
      data.email = response.data.user
      data.authFormLoading = false
      data.first_name = response.data.first_name
      data.last_name = response.data.last_name
      data.designation = response.data.designation
      data.location = response.data.location
      data.profileFormLoading = false
      this.setState(data)
    }).catch((error) => {
      //#TODO Implement Error
      console.log(error)
    })
  }

  handleProfileButton = () => {
    if(this.state.profileFormDisabled){
      this.setState({
        profileFormDisabled: false
      })
    }else{
      this.changeProfile()
    }
  }
  handleCancelButton = () => {
    this.setState(this.initialState)
  }

  changeProfile = () => {
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      designation: this.state.designation,
      location: this.state.location
    }
    this.setState({
      profileFormLoading:true
    })
    changeUserProfile(data).then((response) => {
      this.initialState = this.state
      var data = this.initialState
      data.profileFormLoading = false
      data.profileFormDisabled = true
      data.profileFormSuccess = true
      this.setState(data)
      setTimeout(() => {
        this.initialState.profileFormSuccess = false
        this.setState(this.initialState)
      }, 5000)
    }).catch((error) => {
      //TODO IMPLEMENT ERROR 
      console.log(error)
    })
  }

  handleChange = (e, { name, value}) => this.setState({ [name]: value})

  handleChangeEmail = (e) => {
    //TODO IMPLEMENT EMAIL
    console.log("This functionality is not yet implemented")
  }

  render(){
    const formButton = this.state.profileFormDisabled?(
      <Button 
        content="Update Profile"
        primary
        floated="right"
        onClick={this.handleProfileButton}
      />
    ):(
      <Button.Group floated="right">
        <Button
          content="Cancel"
          onClick={this.handleCancelButton}
        />
        <Button.Or />
        <Button 
          positive
          content="Save"
          onClick={this.handleProfileButton}
        />
      </Button.Group>
    )
    if(this.props.isLoggedIn){
      return(
        <Segment.Group style={{textAlign: "left"}}>
          <Segment>
            <Form>
              <Form.Field>
                <label>Email</label>
                <Input
                  placeholder="Email Address"
                  value={this.state.email}
                  name="email"
                  loading={this.state.authFormLoading}
                  iconPosition="left"
                  readOnly={this.state.authFormDisabled}
                  label={
                    <Button 
                      content={this.state.authFormDisabled?"Change email":"Submit"}
                      onClick={this.handleChangeEmail}
                    />
                  }
                  labelPosition="right"
                />
              </Form.Field>
            </Form>
          </Segment>
          <Segment clearing>
            <Form loading={this.state.profileFormLoading} success={this.state.profileFormSuccess}>
              <Form.Group widths="equal">
                <Form.Input 
                  label="First name" 
                  name="first_name" 
                  value={this.state.first_name} 
                  placeholder="First name"
                  onChange={this.handleChange} 
                  readOnly={this.state.profileFormDisabled}
                />
                <Form.Input 
                  label="Last name" 
                  name="last_name" 
                  value={this.state.last_name} 
                  placeholder="Last name"
                  onChange={this.handleChange} 
                  readOnly={this.state.profileFormDisabled}
                />
              </Form.Group>
              <Form.Input 
                  label="Designation" 
                  name="designation" 
                  value={this.state.designation} 
                  placeholder="Designation"
                  onChange={this.handleChange} 
                  readOnly={this.state.profileFormDisabled}
                />
                <Form.Input 
                  label="Location" 
                  name="location" 
                  value={this.state.location} 
                  placeholder="Location"
                  onChange={this.handleChange} 
                  readOnly={this.state.profileFormDisabled}
                />
                <Message 
                  success
                  content="Profile updated Successfully"
                />
                <br/>
                {formButton}
            </Form>
          </Segment>
        </Segment.Group>
      );
    }else{
      return(
        <Redirect to="/about"/>
      );
    }
  }
}

export default connect(mapStateToProps)(AccountPage)