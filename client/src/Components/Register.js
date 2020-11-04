import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../Actions/Authenticated'
import { connect } from 'react-redux';



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
        const { currentUser } = this.props

        let display

        if(currentUser && currentUser.data) {
            this.props.history.push('/Dashboard')
        } else {
            display = 
            <React.Fragment>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><Link to="/logIn">Log In</Link></li>
                </ul>
                <br></br>
                <div className="container">
                {/*<%- include ('partials/messages') %> <!-- This syntax is newer-->*/}
                <br></br>
                    <form onSubmit={this.onSubmit}>
                        <div className="grid-container">
                            <label className="item1" htmlFor="name">Name</label>
                            <input className="iteml2" 
                            type="username" 
                            name="username" 
                            value={this.state.username}
                            /*value="<%= (function(){ return email})() %>"*/
                            onChange={this.onChange}/>
                            <label className="iteml1" htmlFor="email">Email</label>
                            <input className="iteml2" 
                            type="email" 
                            name="email" 
                            value={this.state.email}
                            /*value="<%= (function(){ return email})() %>"*/
                            onChange={this.onChange}/>
                            <label className="item5" htmlFor="password1">Password</label>
                            <input className="item6" 
                            type="password" 
                            name="password" 
                            value={this.state.password}
                            /*value="<%= (function(){ return password})() %>"*/
                            onChange={this.onChange}/>
                            <input className="iteml5" 
                            type="submit" 
                            value="Register"/>
                        </div>
                    </form>
                </div>
            </ React.Fragment>
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