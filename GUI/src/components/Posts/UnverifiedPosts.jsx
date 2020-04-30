import React, { createRef } from 'react'
import { connect } from 'react-redux'
import AuthErrorModal from '../../auth/AuthErrorModal'
import Posts from './Posts'
import config from '../../assets/ApiConfig'
import { Redirect } from "react-router-dom";
import axios from 'axios'
import { getAccessTokenFromCookie } from '../../auth/AuthUtils'

const mapStateToProps = (state) => {
  const isLoggedIn = state.auth.isLoggedIn;
  const isAdmin = state.auth.isAdmin;
  return {
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin
  }
}
class UnverifiedPosts extends React.Component{
  
  constructor(props){
    super(props)
    this.PostsRef = createRef()
  }

  handleVerify = (id, verification) => {
    const url = config.url.API_URL+'/posts/verify/'+id
    const access_token = getAccessTokenFromCookie()
    const headers = {
      'Authorization': "Bearer "+access_token
    }
    axios.patch(url, { verification:verification }, { headers:headers }).then((response) => {
      console.log(response.data)
      this.PostsRef.current.handleVerified(id, verification)
    }).catch((error) => {
      console.log(error)
      //TODO Implement error
    })
  }

  render(){
    if(this.props.isLoggedIn){
      if(this.props.isAdmin){
        return(
          <Posts
            url={config.url.API_URL+'/posts/unverified'}
            ref={this.PostsRef}
            admin={this.props.isAdmin}
            handleVerify={this.handleVerify}
          />
        )
      }else{
        return(
          <Redirect to="/"/>
        )
      }
    }
    else{
      return(
        <AuthErrorModal/>
      )
    }
  }
}

export default connect(mapStateToProps)(UnverifiedPosts)