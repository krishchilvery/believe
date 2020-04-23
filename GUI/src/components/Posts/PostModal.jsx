import React from 'react'
import { Modal, Form, Button, Message } from 'semantic-ui-react'
import { getAccessTokenFromCookie } from '../../auth/AuthUtils'
import axios from 'axios'
import config from '../../assets/ApiConfig'

class PostModal extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      successMessage: '',
      success: false,
      errorMessage: '',
      error: false,
    }
  }

  handleImageUpload = (event) => {

  }

  handleSubmit = (event) => {
    const access_token = getAccessTokenFromCookie()
    const headers = {
      'Authorization': "Bearer "+access_token,
      'content-type': 'multipart/form-data' 
    }
    if(this.props.postData.id){
      const url = config.url.API_URL + '/posts/'+this.props.postData.id
      const formData = new FormData()
      formData.append('title', document.getElementById("formTitle").value)
      formData.append('text', document.getElementById("formText").value)
      formData.append('url', document.getElementById("formUrl").value)
      axios.patch(url, formData, {headers: headers}).then((response) => {
        this.props.handleSuccess()
        this.props.handleSubmit(response.data)
      }).catch((error) => {
        this.props.handleError()
      })
    }else{
      const url = config.url.API_URL + '/posts/me'
      const formData = new FormData()
      formData.append('title', document.getElementById("formTitle").value)
      formData.append('text', document.getElementById("formText").value)
      formData.append('url', document.getElementById("formUrl").value)
      axios.post(url, formData, {headers: headers}).then((response) => {
        this.props.reloadComponent()
        this.handleClose()
      }).catch((error) => {
        this.props.handleError()
      })
    }
  }

  handleClose = () => {
    this.setState({
      error: false,
      errorMessage: '',
      success: false,
      successMessage: ''
    })
    this.props.handleClose()
  }

  render(){
    return(
      <Modal open={this.props.show} onClose={this.handleClose}>
        <Modal.Header>
          Post
        </Modal.Header>
        <Modal.Content>
          <Form id="postForm" success={this.props.postData.success} error={this.props.postData.error}>
            <Form.Input name="title" label="Title" id="formTitle" value={this.props.postData.title} onChange={this.props.handleChange}/>
            <Form.TextArea name="text" label="Text" id="formText" value={this.props.postData.text} onChange={this.props.handleChange}/>
            <Form.Field>
              <label>Image</label>
              <img src={this.props.postData.image} alt=""/>
              <Button icon="image" content="Upload Image" float="right"/>
            </Form.Field>
            <Form.Input name="url" label="Post URL" id="formUrl" value={this.props.postData.url} onChange={this.props.handleChange}/>
            <Message
              success
              content={this.props.postData.successMessage}
            />
            <Message
              error
              content={this.props.postData.errorMessage}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" onClick={this.handleClose}/>
          <Button content="Submit" onClick={this.handleSubmit} primary/>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default PostModal