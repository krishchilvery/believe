import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AccountPage from './auth/AccountPage'
export const createRoutes = () => {
  return(
    <Switch>
      <Route path="/account" component={AccountPage}/>
      <Route path="/about" />
    </Switch>
  )
}