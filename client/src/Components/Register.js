import React, { Component }from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {

    render () {
        return (
            <React.Fragment>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><Link to="/logIn">Log In</Link></li>
                </ul>
                <br></br>
                <div className="container">
                {/*<%- include ('partials/messages') %> <!-- This syntax is newer-->*/}
                <br></br>
                    <form action="/users/register" method="POST">
                        <div className="grid-container">
                            <label className="item1" htmlFor="name">Name</label>
                            <input className="item2" type="name" name="name" /*value="<%= (function(){ return name})() %>"*/></input>
                            <label className="item3" htmlFor="email">Email</label>
                            <input className="item4" type="email" name="email" /*value="<%= (function(){ return email})() %>"*/></input>
                            <label className="item5" htmlFor="password">Password</label>
                            <input className="item6" type="password" name="password" /*value="<%= (function(){ return password})() %>"*/></input>
                            <input className="item9" type="submit"></input>
                        </div>
                    </form>
                </div>
            </ React.Fragment>
        );
    }
}

export default Register;