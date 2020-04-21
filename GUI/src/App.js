import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import Security from './auth/AuthUtils'
import { BrowserRouter } from 'react-router-dom';
import { createRoutes } from './routes'

class App extends React.Component{

  Routes = createRoutes;

  render(){
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Container>
              <NavBar />
              <Security />
              <this.Routes />
          </Container>
        </Provider>
      </BrowserRouter>
    );
  } 
}

export default App;
