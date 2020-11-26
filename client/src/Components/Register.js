import React, { Component }from 'react';
import TextField from '@material-ui/core/TextField';
import { registerUser } from '../Actions/Authenticated'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class Register extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()

        let newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        if(newUser && newUser.username && newUser.email && newUser.password){
            this.props.registerUser(newUser)
        }
        
        
    }

    render () {

        console.log(this.props) 
        const { currentUser, loading } = this.props

        let display

        if(!loading){

            if(currentUser && currentUser.data) {
                display = <div>Loading...</div>
                this.props.history.push('/Dashboard')
            } else {
                display = 
                <React.Fragment>
                    <div className='my-nav'>
                        <Link to="/"><div className='link-div'>Home</div></Link>
                        <Link to="/LogIn"><div className='link-div'>Log In</div></Link>
                    </div>
                    <br></br>
                    <div>
                    <br></br>
                        <form onSubmit={this.onSubmit}>
                            <div className='register-form'>
                                <div className='register-form-child'>
                                    <TextField className="register-text-input" 
                                    id="standard-basic" 
                                    label="name" 
                                    type="username" 
                                    name="username" 
                                    value={this.state.username}
                                    onChange={this.onChange}/>
                                </div>
                                <div className='register-form-child'>
                                    <TextField className="register-text-input" 
                                    id="standard-basic" 
                                    label="email" 
                                    type="email" 
                                    name="email" 
                                    value={this.state.email}
                                    /*value="<%= (function(){ return email})() %>"*/
                                    onChange={this.onChange}/>
                                </div>
                                <div className='register-form-child'> 
                                    <TextField className="register-text-input" 
                                    id="standard-basic" 
                                    label="password" 
                                    type="password" 
                                    name="password" 
                                    value={this.state.password}
                                    /*value="<%= (function(){ return password})() %>"*/
                                    onChange={this.onChange}/>
                                </div>
                                <div className='register-form-child'> 
                                    <input className="register-submit"
                                    type="submit" 
                                    value="Register"/>
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
        registerUser: (user) => dispatch(registerUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)