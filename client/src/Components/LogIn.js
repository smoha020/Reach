import React, { Component }from 'react';
import { connect } from 'react-redux';
import { signIn } from '../Actions/Authenticated'

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
            if(currentUser && currentUser.data) {
                this.props.history.push('/Dashboard')
            } else {
                display = <React.Fragment>
                    <ul>
                        <li><a href="/">Home</a></li>
                    </ul>
                    <br></br>
                    <div className="container">
                    {/*<%- include ('partials/messages') %>*/}
                        <form onSubmit={this.onSubmit}/*action="/users/login" method="POST"*/>
                            <div className="grid-container">
                                <label className="iteml1" htmlFor="email">Email</label>
                                <input className="iteml2" 
                                type="email" 
                                name="email" 
                                value={this.state.email}
                                /*value="<%= (function(){ return email})() %>"*/
                                onChange={this.onChange}/>
                                <label className="iteml3" htmlFor="password1">Password</label>
                                <input className="iteml4" 
                                type="password" 
                                name="password" 
                                value={this.state.password}
                                /*value="<%= (function(){ return password})() %>"*/
                                onChange={this.onChange}/>
                                <input className="iteml5" 
                                type="submit" 
                                value="Sign In"/>
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
