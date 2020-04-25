import React from 'react';
import {Modal, Header, Button} from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { setShowAuthModal } from './authSlice';
import { useHistory } from 'react-router-dom';

export default function AuthErrorModal(props){
  const dispatch  = useDispatch()
  const history = useHistory()
  return(
    <Modal open={true} basic closeOnDimmerClick={false}>
      <Header icon="sign-in" content="Authentication Error" />
      <Modal.Content content="Please login to continue"/>
      <Modal.Actions>
        <Button basic inverted
          color='red' 
          icon="remove" 
          content="Cancel"
          onClick={() => {history.goBack()}}/>
        <Button basic inverted
          color='green' 
          icon="checkmark" 
          content="Login"
          onClick={() => {dispatch(setShowAuthModal(true));}}/>
      </Modal.Actions>
    </Modal>
  )
}