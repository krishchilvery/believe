import React from 'react'
import { Modal, Header, Button } from 'semantic-ui-react';
import { logoutService } from './AuthUtils';

class LogoutModal extends React.Component{
  
  logout = () => {
    logoutService();
    this.props.handleLogout();
    this.props.handleClose();
  }
  render(){
    return(
      <Modal open={this.props.show} basic size="mini">
        <Header icon="sign-out" content="Are you sure you want to logout?"></Header>
        <Modal.Actions>
          <Button basic inverted
            color='red' 
            icon="remove" 
            content="Cancel" 
            size="big"
            onClick={this.props.handleClose}/>
          <Button basic inverted
            color='green' 
            icon="checkmark" 
            content="Proceed" 
            size="big"  
            onClick={this.logout}/>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default LogoutModal;