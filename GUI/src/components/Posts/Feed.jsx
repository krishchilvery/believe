import React from 'react'
import { connect } from 'react-redux'
import AuthErrorModal from '../../auth/AuthErrorModal';
import Posts from './Posts';
import config from '../../assets/ApiConfig'

const mapStateToProps = (state) => {
  const isLoggedIn = state.auth.isLoggedIn;
  return {
    isLoggedIn: isLoggedIn
  }
}
class FeedComponent extends React.Component{
  render(){
    if(this.props.isLoggedIn){
      return(
        <Posts url={config.url.API_URL+'/posts/verified'}/>
      )
    }
    else{
      return(
        <AuthErrorModal/>
      )
    }
  }
}

export default connect(mapStateToProps)(FeedComponent)