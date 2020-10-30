import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { getPosts, createPost, deletePost, likePost, unlikePost } from '../Actions/Posts'
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
            postId: '',
            disabled: ''
        }
    }

    handleShow = ()=> {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }
    handleShow2 = (post, note)=> {

        if(note.read === false) {
            axios.put(`/social/notificationRead/${note._id}`)
            .then(data => console.log(data))
            .catch(err => console.log(err))
            
        }
        console.log(post)
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

    }

    submitComment = (e, post)=> {
    
        e.preventDefault();

        console.log(post.user)
        console.log('here is a comment')
        console.log(this.state.comment)
        console.log(this.state.currentUser.email)
        console.log(post._id)
    }

    clickLike = (id, e ) => {
        e.preventDefault()
        
        let button = e.target
        button.disabled = true

        setTimeout(function() {
            button.disabled = false;
        }, 2500)

        let like = {
            postId: id,
            user: this.props.currentUser.data.credentials.username
        }
        this.props.likePost(like)
    }

    clickUnlike = (id, e) => {

        let button = e.target
        button.disabled = true

        setTimeout(function() {
            button.disabled = false;
        }, 2500) 

        let like = {
            postId: id,
            user: this.props.currentUser.data.credentials.username
        }
        this.props.unlikePost(like)
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

        const { currentUser, posts, loading, likes } = this.props
        console.log(this.props)

        let display;
        let displayposts
        let displayuser
        let deletedisplay
        let thumbsLogo 
        let notesDisplay
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
                        thumbsLogo = likes.map(like => {
                            if(like.postId === post._id) {
                                return post._id
                            } 
                        })

                        
                        return (
                            <React.Fragment key={index}>
                                <div className='post'>
                                    {deletedisplay}
                                    <Link to={`/User/${post.user}`}>{post.user}</Link>
                                    <p>{post.body}</p>
                                    <p>{post.createdAt}</p>
                                    {( thumbsLogo.includes(post._id) )? (
                                    <Button disabled={this.disabled} onClick={this.clickUnlike.bind(this, post._id)}>thumbs down</Button>
                                    ) : (
                                    <Button disabled={this.disabled} onClick={this.clickLike.bind(this, post._id)}>thumbs up</Button>
                                    )} 
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
 
                notesDisplay = currentUser.data.notifications.map(note => {
                    let myPost = posts.map(post => {
                        if(post._id === note.postId) { 
                            return post
                        }
                    })
                    if(note.notType === 'like') { 

                        return <li><Button variant="primary" style={{color: 'white'}} onClick={this.handleShow2.bind(this, myPost[0], note)}>{note.sender} liked your post</Button></li>
                    } else {
                        return <li><Button variant="primary" style={{color: 'red'}} onClick={this.handleShow2.bind(this, myPost[0], note)}>{note.sender} commented on your post </Button></li> 
                    }
                })
                display = 
                <React.Fragment>
                    <ul>
                        <li className="company"><a style={{color: 'white'}}>NewsQuest</a></li>
                        <li><Button onClick={this.logOut}>Log Out</Button></li>
                        <li>
                            <div>
                                <Button >Notifications</Button>
                                <ul>{notesDisplay}</ul>
                            </div>
                        </li>
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
        likes: state.Authenticate.likes,
        posts: state.Data.posts,
        loading: state.Authenticate.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => dispatch(getPosts()),
        createPost: (post) => dispatch(createPost(post)),
        signOut: () => dispatch(signOut()),
        deletePost: (post) => dispatch(deletePost(post)),
        likePost: (like) => dispatch(likePost(like)),
        unlikePost: (like) => dispatch(unlikePost(like))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)