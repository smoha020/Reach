import React, { Component }from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render () {
    return (
      <React.Fragment>
        <ul>
            <li className="company"><a>NewsQuest</a></li>
            <li><a href="#">Home</a></li>
            <li><Link to="/Register">Register</Link></li>
            <li><Link to="/logIn">Log In</Link></li>
        </ul>
        <div className="container">
            <br></br> 
            <div>
                <h1 style={{textAlign: 'center'}}>Welcome To NewsQuest</h1>
            </div>
        </div>
      </React.Fragment>
    );
  }
  
}

export default Home;