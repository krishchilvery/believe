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
      imageFile: ''
    }
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
      formData.append('image',this.state.imageFile)
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
      formData.append('image',this.state.imageFile)
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
  
  handleImageFileChange = (e) => {
    e.preventDefault();
    let reader = new FileReader()
    var file = e.target.files[0]

    // reader.onloadend = () => {

    //   var image = new Image()
      
    //   image.src = reader.result
      
    //   image.onload = () => {
    //     var canvas = document.createElement('canvas')
    //     const max_size = 544
    //     var width = image.width
    //     var height = image.height
    //     if(width > height){
    //       if (width > max_size) {
    //         height *= max_size/width
    //         width = max_size
    //       }
    //     } else {
    //       if (height > max_size) {
    //         width *= max_size/height
    //         height = max_size
    //       }
    //     }
    //     canvas.width = width
    //     canvas.height = height
    //     canvas.getContext('2d').drawImage(image, 0, 0, width, height)
    //     var dataUrl = canvas.toDataURL('image/jpeg')
    //     var resizedImageFile = this.dataURItoBlob(dataUrl)
    //     this.setState({
    //       imageFile: resizedImageFile
    //     })
    //     this.props.handleChange(e,{name:'image', value:dataUrl})
    //   }
    // }

    reader.onloadend = () => {
      this.setState({
        imageFile: file
      })
      this.props.handleChange(e,{name:'image',value:reader.result});
    }
    reader.readAsDataURL(file);
  }

  // dataURItoBlob(dataURI) {
  //   var byteString;
  //   if (dataURI.split(',')[0].indexOf('base64') >= 0)
  //       byteString = atob(dataURI.split(',')[1]);
  //   else
  //       byteString = unescape(dataURI.split(',')[1]);
  //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //   var ia = new Uint8Array(byteString.length);
  //   for (var i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([ia], {type:mimeString});
  // }

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
              <img height="200px" width="300px" src={this.props.postData.image} alt=""/>
              <input type="file" name="image" onChange={this.handleImageFileChange}/>
              {/* TODO Write better file Upload UI */}
              {/* <Button icon="image" content="Upload Image" float="right"/> */}
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