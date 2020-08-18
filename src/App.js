import React , { Component}from 'react';
import './App.css';


import { Route, BrowserRouter as Router, Switch,Link ,Redirect} from 'react-router-dom';

import MainPage from './Pages';
import MessageShow from './Pages/MessageShow';




class App extends Component{
  
  render() {
    return  (
    <Router>
    <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact  path="/MessageShow" component={MessageShow}/>

      </Switch>
      </Router>)

  }
}

   
  


export default App;
