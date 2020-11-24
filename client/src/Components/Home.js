import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'; 
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const test = (name) => <p> hello:  + {name}</p>

class Home extends Component {

  render () {

    const classes = useStyles;

    const test1 = test('Said')
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
              <Link to='/Register'>
                <div className='home-right-mid-btn'>
                  Sign Up
                </div>
              </Link>
              <Link to='/LogIn'>
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

const myStyles = {
  root: {
    background: '#2196f3',
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  },
}
export default Home;