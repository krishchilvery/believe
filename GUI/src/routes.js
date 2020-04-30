import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AccountPage from './auth/AccountPage'
import FeedComponent from './components/Posts/Feed'
import UserPosts from './components/Posts/UserPosts'
import UnverifiedPosts from './components/Posts/UnverifiedPosts';

export const createRoutes = () => {
  return(
    <Switch>
      <Route exact path="/" component={FeedComponent} />
      <Route path="/account" component={AccountPage}/>
      <Route path="/about" />
      <Route path="/posts/me" component={UserPosts}/>
      <Route path="/posts/unverified" component={UnverifiedPosts}/>
    </Switch>
  )
}