import React, { Component }from 'react';
import { Link } from 'react-router-dom';



class Home extends Component {

  render () {
    return (
      <React.Fragment>
        <div className='home-container'>
          <div className='home-left'>
            <div className='home-left-mid'>
              <div>Be heard</div>
              <div>Be seen</div>
              <div>Connect with others</div>
            </div>
          </div>
          <div className='home-right'>
            <div className='home-right-top'>
              <p>Welcome to the network</p>
            </div>
            <div className='home-right-mid'>
              <Link to='/Register' style={{ textDecoration: 'none'}}>
                <div className='home-right-mid-btn'>
                  Sign Up
                </div>
              </Link>
              <Link to='/LogIn' style={{ textDecoration: 'none'}}>
                <div className='home-right-mid-btn'>
                  Log In
                </div>
              </Link>
            </div>
          </div>
        </div>
        <footer>
          <p>&#169</p>
        </footer>
      </React.Fragment>
    );
  }
  
}

export default Home;