import React from 'react'
import { connect } from 'react-redux'
import AuthErrorModal from '../../auth/AuthErrorModal';
import Posts from './Posts';
import PostModal from './PostModal'
import { Button, Icon, Divider } from 'semantic-ui-react';
import config from '../../assets/ApiConfig'

const mapStateToProps = (state) => {
  const isLoggedIn = state.auth.isLoggedIn;
  return {
    isLoggedIn: isLoggedIn
  }
}

class UserPosts extends React.Component{
  
  constructor(props){
    super(props)
    this.state = this.get_initial_state()
    this.PostsRef = React.createRef();
  }

  get_initial_state = () => {
    return {
      show: false,
      id: '',
      title: '',
      text: '',
      image: '',
      url: '',
      successMessage: '',
      success: false,
      errorMessage: '',
      error: false
    }
  }

  reloadComponent = () => {
    this.PostsRef.current.reloadPosts()
  }

  handleClose = () => {
    this.setState(
      this.get_initial_state()
    )
  }

  handleSuccess = () => {
    this.setState({
      success: true,
      successMessage: "Post edited successfully",
      error: false,
      errorMessage: ''
    })
  }

  handleError = () => {
    this.setState({
      error: false,
      errorMessage: "Unable to edit post. Please try later",
      success: false,
      successMessage: ''
    })
  }

  handleChange = (e, { name, value}) => this.setState({ [name]: value})

  handleEdit = (postData) => {
    this.setState({
      show: true,
      id: postData.id,
      title: postData.title,
      text: postData.text,
      image: postData.image,
      url: postData.url
    })
  }

  handleSubmit = (postData) => {
    this.PostsRef.current.changeElementData(postData)
  }

  handleNew = () => {
    this.setState({
      show: true
    })
  }

  render(){
    if(this.props.isLoggedIn){
      return(
        <>
        <Divider/>
          <Button
            positive fluid animated="vertical"
            onClick={this.handleNew}>
            <Button.Content visible><Icon name='plus'/></Button.Content>
            <Button.Content hidden>Add a new post</Button.Content>
          </Button>
        <Posts url = {config.url.API_URL+'/posts/me'}
          editable = {true}
          handleEdit = {this.handleEdit}
          ref = {this.PostsRef}
        />
        <PostModal
          show = {this.state.show}
          postData = {this.state}
          handleClose = {this.handleClose}
          handleSubmit = {this.handleSubmit}
          handleChange = {this.handleChange}
          handleSuccess = {this.handleSuccess}
          handleError = {this.handleError}
          reloadComponent = {this.reloadComponent}
        />
        </>
      )
    }
    else{
      return(
        <AuthErrorModal/>
      )
    }
  }
}

export default connect(mapStateToProps)(UserPosts)