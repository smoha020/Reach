import React, { Component }from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { signIn } from '../Actions/Authenticated'
import { Link } from 'react-router-dom';

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }
 
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log('b4 signIn')
        if(user.email && user.password) {
            this.props.signIn(user)
        }
         
    }
    render () {
        console.log(this.props) 
        const { currentUser, loading } = this.props

        let display
 

        if(!loading){
            if(currentUser && currentUser.credentials) {
                this.props.history.push('/Dashboard')
            } else {
                display = <React.Fragment>
                    <div className='my-nav'>
                        <Link to="/"><div className='link-div'>Home</div></Link>
                        <Link to="/Register"><div className='link-div'>Sign Up</div></Link>
                    </div>
                    <br></br>
                    <div className="container">
                        <form onSubmit={this.onSubmit}>
                            <div className="register-form">
                                <div className='register-form-child'>
                                    <TextField className="register-text-input" 
                                    id="standard-basic" 
                                    label="email" 
                                    type="email" 
                                    name="email" 
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                                </div>
                                <div className='register-form-child'>
                                    <TextField className="register-text-input" 
                                    id="standard-basic" 
                                    label="password"  
                                    type="password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                                </div>
                                <div className='register-form-child'>
                                    <input className="register-submit"
                                    type="submit" 
                                    value="Sign In"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </ React.Fragment>
            }
        }
        

        return (
            <React.Fragment>{display}</React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.Authenticate.loading,
        currentUser: state.Authenticate.currentUser
    }
}
  
  
const mapDispatchToProps = dispatch => {

    return {
        signIn: (user) => dispatch(signIn(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
