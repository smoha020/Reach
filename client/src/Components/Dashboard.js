import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { getPosts, createPost, deletePost } from '../Actions/Posts'
import { signOut } from '../Actions/Authenticated'
import { connect } from 'react-redux';
import Post from './Post'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Modal2 from 'react-bootstrap/Modal';
import CommentInput from './CommentInput'


class Dashboard extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            //currentUser: '',
            posts: [],
            post: '',
            comment: '',
            show: false,
            show2: false,
            postId: ''
        }
    }

    handleShow = ()=> {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }
    handleShow2 = (post)=> {
        
        this.setState({show2: true, postId: post._id})
    }

    handleClose2 = () => {
        this.setState({show2: false});
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
        e.preventDefault()
        

        let newpost = {
            body: this.state.post,
            user: this.props.currentUser.data.credentials.username,
        }

        this.props.createPost(newpost)
        this.setState({ show: false })

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
        this.props.deletePost(post)
    }
    
    //LOG OUT
    logOut = () => { 
        this.props.signOut()
        //this.props.history.push('/')
    }

    render() {

        const { currentUser, posts, loading } = this.props
        console.log(this.props)

        let display;
        let displayposts
        let displayuser
        let deletedisplay
        let thumbsLogo = []

        /*WHEN YOU COME TO THIS PAGE VIA URL OR WHEN YOU REFRESH, 
        THE INITIAL RENDERING TAKES PLACE AND isAuthenticated is '', 
        AFTER THIS IT RE-RENDERS AND isAuthenticated GETS THE data PROPERTY*/
      
        if(loading) {
            return <div>Loading..</div>
        } else {
            if(currentUser && currentUser.data != '') {
         
                if(posts != []) {
                    displayposts  = posts.map((post, index) => {
                    
                        if(post.user == currentUser.data.credentials.username) {
                            deletedisplay = <button onClick={this.deletePost.bind(this, post)} style={{color: 'white'}, {background: 'red'}}>
                                        X {currentUser.data.credentials.username} 
                                    </button>
                        } else { deletedisplay = '' }
                        /*WITHTOUT THIS, deletedisplay WILL CONTINUE TO HAVE THE 
                        VALUE ABOVE FOR EVERY ITERATION AFTER THE FIRST TRUE IF STATEMENT.*/
        
                        thumbsLogo = []
                        thumbsLogo = currentUser.data.likes.map(like => {
                            if(like.postId === post._id) {
                                return post._id
                            } 
                        })

                        console.log(thumbsLogo)
                        
                        return (
                            <React.Fragment key={index}>
                                <div className='post'>
                                    {deletedisplay}
                                    <p>{post.user}</p>
                                    <p>{post.body}</p>
                                    <p>{post.createdAt}</p>
                                    {console.log("in return: " + thumbsLogo.includes(post._id) )}
                                    {( thumbsLogo.includes(post._id) )? (<button>thumbs down</button>) : (<button>thumbs up</button>)} 
                                    <p>{post.likeCount} likes</p>
                                    <p>Comment count</p>
                                    <p>{post.commentCount} comments</p>
                                </div>
                            {/*<Link to={`Post/${post._id}`} >
                                    <button>
                                        OPEN
                                    </button>
                                </Link> */}
                                <Button variant="primary" onClick={this.handleShow2.bind(this, post)}>
                                    View comments
                                </Button>
                                
            
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
                    <Modal show={this.state.show2} onHide={this.handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Post postId={this.state.postId}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose2}>
                                Close
                           </Button>
                        </Modal.Footer>
                    </Modal>

                    

                    <div className='display-flex'>
                        <div className='post-container'>
                            {displayposts}
                        </div>        
                        <div className="profile">
                            <p>Picture: {currentUser.data.credentials.pic}</p>
                            <p>Name: {currentUser.data.credentials.username}</p>
                            <p>Location: {currentUser.data.credentials.location}</p>
                            <p>Bio: {currentUser.data.credentials.bio}</p>
                            <p>Website: {currentUser.data.credentials.website}</p>
                            <p>Joined: {currentUser.data.credentials.joinDate}</p>
                        </div>
                    </div>
            
                </ React.Fragment>
                
        
            } else {
                
                this.props.history.push('/LogIn')
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
        currentUser: state.Authenticate.currentUser,
        posts: state.Data.posts,
        loading: state.Authenticate.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => dispatch(getPosts()),
        createPost: (post) => dispatch(createPost(post)),
        signOut: () => dispatch(signOut()),
        deletePost: (post) => dispatch(deletePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)