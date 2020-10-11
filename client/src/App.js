import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Components/Home'
import LogIn from './Components/LogIn'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard' 
import axios from 'axios'
import { connect } from 'react-redux';
import { getAuthenticated } from './Actions/Authenticated'

import MyTest from './Components/MyTest'

class App extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    console.log('componentDidMount')
    this.props.getAuthenticated()
  }


  /*changeAccess = (update) => {
    console.log(update)
    this.setState({isAuthenticated: update})
  }*/

  render () {
    //const { isAuthenticated, getAuthenticated } = this.props
    console.log(this.props)
    return (
      <Router>
        <Route exact path='/' component={Home}/> 
        <Route path='/logIn' component={LogIn}/>
        <Route path='/Register' component={Register}/> 
        <Route path='/Dashboard' component={Dashboard}/>
      </Router>
    );
  }
   
}

const mapStateToProps = state => {
  return {
    currentUser: state.Authenticate.currentUser
  }
}


const mapDispatchToProps = dispatch => {

  return {
    getAuthenticated: () => dispatch(getAuthenticated())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
