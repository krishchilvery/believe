import React from 'react'
import { Segment, Label, Divider, Button, Feed } from 'semantic-ui-react'
import axios from 'axios'
import { getAccessTokenFromCookie } from '../../auth/AuthUtils'

class Posts extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      initial_url: this.props.url,
      previous_url:'',
      next_url: this.props.url,
      posts: ''
    }
  }

  componentDidMount = () => {
    this.loadMoreData()
  }

  loadMoreData = (type="next") => {
    const access_token = getAccessTokenFromCookie()
    const headers = {Authorization:'Bearer '+access_token}
    axios.get(this.state.next_url, {headers: headers}).then((response) => {
      this.setState({
        posts: response.data.results,
        previous_url: response.data.previous,
        next_url: response.data.next
      })
    })
  }

  handleEdit = (event) => {
    const data = {
      id: event.target.id,
      title: document.getElementById('title'+event.target.id).innerHTML,
      image: document.getElementById('image'+event.target.id).src,
      text: document.getElementById('text'+event.target.id).innerHTML,
      url: document.getElementById('url'+event.target.id).href===document.location.href?"":document.getElementById('url'+event.target.id).href
    }
    this.props.handleEdit(data)
  }

  changeElementData = (postData) => {
    document.getElementById("title"+postData.id).innerHTML = postData.title
    document.getElementById("text"+postData.id).innerHTML = postData.text
    document.getElementById("image"+postData.id).src = postData.image
    document.getElementById("url"+postData.id).href = postData.url
    document.getElementById("url"+postData.id).disabled = postData.url?true:false
  }

  reloadPosts = () => {
    this.setState({
      next_url: this.state.initial_url
    })
    this.loadMoreData()
  }
  
  render(){
    
    const posts = Array.from(this.state.posts)
    
    return(
        <>
        <Divider/>
        {
          posts.map(
            (post, index) => (
              <Segment raised key={index.toString()}>
                <Label id={"label"+post.id} color={post.verification==="UV"?"grey":post.verification==="V"?"green":"red"} ribbon="right">{post.verification==="UV"?"Unverified":post.verification==="V"?"Verified":"Fake"}</Label>
                <span>
                  <h3 id={"title"+post.id}>
                    {post.title}
                  </h3>
                </span>
                {
                  this.props.editable?post.verification ==="UV"?(
                    <Button icon="pencil" content="Edit" floated="right" onClick={this.handleEdit}
                      id={post.id}
                      image={post.image}
                      url={post.url}
                    />
                  ):(<></>):(<></>)
                }
                <Divider/>
                <img id={"image"+post.id} src={post.image} alt=""/>
                <Feed>
                  <Feed.Content id={"text"+post.id}>
                    {post.text}
                  </Feed.Content>
                  <br/>
                  <Feed.Extra>
                    <Button as='a' id={"url"+post.id} href={post.url} disabled={post.url?false:true} content="Go to post" target="_blank"/>
                  </Feed.Extra>
                </Feed>
              </Segment>
            )
          )
        }
        <Divider horizontal>End of Line</Divider>
        </>
    )
  }
}

export default Posts