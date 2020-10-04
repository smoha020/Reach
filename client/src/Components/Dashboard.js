import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { getPosts, createPost } from '../Actions/Posts'
import { signOut } from '../Actions/Authenticated'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CommentInput from './CommentInput'


class Dashboard extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            //currentUser: '',
            posts: [],
            post: '',
            comment: '',
            show: false
        }
    }

    handleShow = ()=> {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    componentDidMount() {
        console.log('dashboard componentDidMount')
        this.props.getPosts()
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    //MAKE A POST 
    onSubmit = (e) => {
        //this.setState({show: false});
        //e.preventDefault()
        
        let currentUser= this.props.isAuthenticated.data

        let newpost = {
            post: this.state.post,
            user: currentUser.email,
        }

        console.log(newpost)
        this.props.createPost(newpost)

        /*axios.post('/social/posts', newpost)
        .then(data => console.log(data))
        .catch(err => console.log(err))*/
    }

    submitComment = (e, post)=> {
    
        e.preventDefault();

        console.log(post.user)
        console.log('here is a comment')
        console.log(this.state.comment)
        console.log(this.state.currentUser.email)
        console.log(post._id)

        /*let newcomment = {
            comment: this.state.comment,
            sender: this.state.currentUser.email,
            reciever: post.user
        }

        axios.put(`/social/posts/${post._id}`, newcomment)*/
    }

    deletePost = (post) => {
        console.log(post)
        axios.delete(`/social/posts/${post._id}`)
        .then(() => {
            console.log('deleted post')
            //IF WE PUT 'Dashboard' INSIDE PUSH, NOTHING WILL HAPPEN
            this.props.history.push('/Login')
        })
        .catch(err => console.log(err))
    }

    //LOG OUT
    logOut = () => { 
        this.props.signOut()
        //this.props.history.push('/')
    }

    render() {

        console.log(this.props)

        let display;
        let displayposts
        let deletedisplay

    /*WHEN YOU COME TO THIS PAGE VIA URL OR WHEN YOU REFRESH, 
    THE INITIAL RENDERING TAKES PLACE AND isAuthenticated is '', 
    AFTER THIS IT RE-RENDERS AND isAuthenticated GETS THE data PROPERTY*/
    if(this.props.isAuthenticated != '') {
        if(this.props.isAuthenticated.data == '') {
            console.log('is it false?')
            this.props.history.push('/LogIn')
        }
        
        if(this.props.isAuthenticated.data != '') {
     
            console.log('we r logged in')
            if(this.props.posts != []) {
                displayposts  = this.props.posts.map((post, index) => {
                
                    if(post.user == this.props.isAuthenticated.data.email) {
                        deletedisplay = <button onClick={this.deletePost.bind(this, post)} style={{color: 'white'}, {background: 'red'}}>
                                    X {this.props.isAuthenticated.data.email} , {post.user}
                                </button>
                    } else deletedisplay = '' 
                    /*WITHTOUT THIS, deletedisplay WILL CONTINUE TO HAVE THE 
                    VALUE ABOVE FOR EVERY ITERATION AFTER THE FIRST TRUE IF STATEMENT.*/
    
                    return (
                        <React.Fragment>
                            <div key={index} className='post'>
                                {deletedisplay}
                                <p>{post.user}</p>
                                <p>{post.post}</p>
                                <button>Thumbs up count</button>
                                <p>1</p>
                                <p>Comment count</p>
                                <p>{post.comments.length} comments</p>
                            </div>
                            <Link to={`Post/${post._id}`} >
                                <button>
                                    OPEN
                                </button>
                            </Link>
                        </React.Fragment>
                    )   
                })
            }

            display = 
            <React.Fragment>
                <ul>
                    <li className="company"><a>NewsQuest</a></li>
                    <li><button onClick={this.logOut}>Log Out</button></li>
                    <Button variant="primary" onClick={this.handleShow}> Add Post </Button>              
                </ul>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <form onSubmit={this.onSubmit}> 
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type='text'
                            name="post"
                            value={this.state.post}
                            onChange={this.onChange} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <input type="submit" value="post"/>
                        </Modal.Footer>
                    </form>
                </Modal>

                <div className='display-flex'>
                    <div className='post-container'>
                        {displayposts}
                    </div>        
                    <div className="profile">
                        <p>picture: </p>
                        <p>name: </p>
                        <p>bio: </p>
                        <p>website: </p>
                    </div>
                </div>
        
            </ React.Fragment>
            
    
        }
    }
        /*Because isAthenticated.data doesn't exist when isAuthenticated
        is null, we will have an error*/
        
        return (
            <div>{display}</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Authenticate.isAuthenticated,
        posts: state.Posts.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => dispatch(getPosts()),
        createPost: (newpost) => dispatch(createPost(newpost)),
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)