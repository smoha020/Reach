import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { getPosts, createPost, deletePost, likePost, unlikePost } from '../Actions/Posts'
import { signOut, updateUser, getAuthenticated } from '../Actions/Authenticated'
import { connect } from 'react-redux';
import Post from './Post'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import PhotoIcon from '@material-ui/icons/Photo';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactTimeAgo from 'react-time-ago'
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
            show3: false,
            show4: false,
            postId: '',
            disabled: false,
            pic: '',
            username: '',
            bio: '',
            location: '',
            website: '',
            notes: 'notes',
            visible: false,
            notesColor: 'white'
        };
    }
    

    handleShow = ()=> {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }
    handleShow2 = (post, note)=> {

        /*Once the notification is clicked, 
        it will display the modal for the post*/
        this.setState({
            show2: true, 
            postId: post._id
        })

        
        if(note.read === false) {
            axios.put(`/social/notificationRead/${note._id}`)
            .then(data => {
                console.log(data)
                
            })
            .catch(err => console.log(err))
        }
        
    }

    handleClose2 = () => {

        //If modal was opened for notifications
        if(this.state.visible == true) {
            console.log('refresh?')
            //this.props.history.push('/Dashboard')
            window.location.reload()
        } else {
            this.setState({show2: false});
            console.log('inside handleClose2')
            //this.props.getPosts()
        }
    }

    handleShow3 = ()=> {
        this.setState({show3: true});
    }

    handleClose3 = () => {
        this.setState({show3: false});
    }
    handleShow4 = ()=> {
        this.setState({show4: true});
    }

    handleClose4 = () => {
        this.setState({show4: false});
    }

    componentDidMount() {
        //if(this.props.currentUser && this.props.currentUser.data != '') {
            console.log('componentDidMount')
            this.props.getPosts()
        //}
    }
 
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onChangeFile = (e) => {
        this.setState({ pic: e.target.files[0] })
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

    }

    clickLike = ( id ) => {
        
        this.setState({ disabled: true })
        
        setTimeout(() => { 
            this.setState({ disabled: false })
        }, 2500) 
        
        console.log(id)
        let like = {
            postId: id,
            user: this.props.currentUser.data.credentials.username
        }
        this.props.likePost(like)
    }

    clickUnlike = ( id ) => {

        this.setState({ disabled: true })
        
        setTimeout(() => {
            this.setState({ disabled: false })
        }, 2500) 
        
        let like = {
            postId: id,
            user: this.props.currentUser.data.credentials.username
        }
        this.props.unlikePost(like)
    }

    onSubmitProfile = (e) => {
        e.preventDefault()

        let user = {
            _id: this.props.currentUser.data.credentials._id,
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website
        }
        axios.post(`/users/update/${user._id}`, user)
        .then(res => {
            this.props.getAuthenticated()
            this.setState({ show3: false })
        })
        .catch((err) => {
            const error = err;  
        })
    }

    onChangePic = (e) => {
        this.setState({
            pic: e.target.files[0]
        })
    }

    onSubmitPic = (e) => {
        e.preventDefault()
        const fd = new FormData();
        fd.append('pic', this.state.pic, this.state.pic.name)
        axios.post('/users/uploadImage', fd)
        .then( data => {
            console.log(data)
            this.props.getAuthenticated()
            console.log('inside uploadImage submit')
            this.props.getPosts()
            this.setState({ show4: false })
        })
        .catch(err => {
            console.log(err)
        })
    }

    deletePost = (post) => {
        this.props.deletePost(post)
    }
    
    //LOG OUT
    logOut = () => { 
        this.props.signOut()
        //this.props.history.push('/')
    }

    changeNotes = () => {

        
        if(this.state.visible) {
            this.setState({ 
                visible: false, 
                notesColor: 'white'
            })
        } else {
            this.setState({ 
                visible: true,
                notesColor: '#0d47a1'
            })
        }
        
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
            console.log('dash loading')
            return (
                <div style={{ 
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}}
                >
                    <CircularProgress />
                </div>
            )
        } else {
            if(currentUser && currentUser.data != '') {
         
                /*the if statement below is needed because when the above 
                if statement is true, the post is still being fetched
                and posts.map will cause an error*/
                if(posts != []) {
                    console.log('posts not empty: ' + posts)
                    displayposts  = posts.map((post, index) => {
                        if(post.user == currentUser.data.credentials.username) {
                            deletedisplay = <button onClick={this.deletePost.bind(this, post)}>
                                        Delete
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
                                    <div className='post-pic'>
                                        {(post.pic)? (
                                            <img src={`data:image/png;base64,${post.pic}`} alt='jpg'/>
                                        ): (<div className='post-pic-second'></div>)}
                                    </div>
                                    <div className='post-right'>
                                        <div className='post-right-top'>
                                            <div className='post-name'><Link style={{ textDecoration: 'none'}} to={`/User/${post.user}`} style={{ fontWeight: 'bold'}}>{post.user}</Link></div>
                                            <div className='post-time'><ReactTimeAgo date={post.createdAt} locale="en-US"/></div>
                                            <div className='post-delete'>{deletedisplay}</div>
                                        </div>
                                        <div className='post-body'>{post.body}</div>
                                        <div className='post-bottom'>
                                            <div className='bottom-thumb'>
                                                {( thumbsLogo.includes(post._id) )? (
                                                    <button disabled={this.state.disabled} onClick={this.clickUnlike.bind(this, post._id)}><ThumbDownIcon style={{ fontSize: 30, color: '#2196f3', cursor: 'pointer'}}></ThumbDownIcon></button>
                                                ) : (
                                                    <button disabled={this.state.disabled} onClick={this.clickLike.bind(this, post._id)} ><ThumbUpIcon style={{ fontSize: 30, color: '#2196f3', cursor: 'pointer'}}></ThumbUpIcon></button>
                                                )} 
                                                <div>{post.likeCount}</div>
                                            </div>
                                            <div className='bottom-comment'>
                                                <div><CommentIcon style={{ fontSize: 30, color: '#2196f3', cursor: 'pointer'}} onClick={this.handleShow2.bind(this, post)}></CommentIcon></div>
                                                <div>{post.commentCount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </React.Fragment>
                        )   
                    })
                }
 
                notesDisplay = currentUser.data.notifications.map((note, index) => {
                    let myPost = posts.find( post => {
                        return (post._id === note.postId) 
                    })
                    
                    if(note.notType === 'like') { 

                        return <div key={index} variant="primary" onClick={this.handleShow2.bind(this, myPost, note)}>{note.sender} liked your post </div>
                    } else {
                        return <div key={index} variant="primary" onClick={this.handleShow2.bind(this, myPost, note)}>{note.sender} commented on your post </div>
                    }
                })

              
                if(posts.length != 0) {
                    display = 
                    <React.Fragment>
                        <div className='my-nav'>
                            <div className='brand-name'>NewsQuest</div>
                            <div className='move-right'>   
                                <div className='notes-display'>
                                    <Badge className='notes-icon' color="secondary" badgeContent={currentUser.data.notifications.length}>
                                        <NotificationsIcon  style={{ fontSize: 40, color: `${this.state.notesColor}` }} onClick={this.changeNotes}></NotificationsIcon>
                                    </Badge>
                                    {(this.state.visible)? (
                                        <div className='notes-menu'>
                                            {notesDisplay}
                                        </div>): (null)}
                                </div>
                                <PostAddIcon className='post-icon' style={{ fontSize: 40 }} onClick={this.handleShow}></PostAddIcon>  
                                <div onClick={this.logOut} className='log-out'>Log Out</div>    
                            </div>   
                        </div>
    
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <form onSubmit={this.onSubmit}> 
                                <Modal.Header closeButton>
                                    <Modal.Title>New Post</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{width: '100%'}}>
                                    <textarea
                                    type='text'
                                    name="post"
                                    value={this.state.post}
                                    style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                                    onChange={this.onChange} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <button 
                                    style={btnStyle} 
                                    onClick={this.handleClose}>
                                        Close
                                    </button>
                                    <input 
                                    style={btnStyle} 
                                    type="submit" 
                                    value="post"/>
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
                                <button
                                style={btnStyle}
                                onClick={this.handleClose2}>
                                    Close
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={this.state.show3} onHide={this.handleClose3}>
                            <form onSubmit={this.onSubmitProfile}> 
                                <Modal.Header closeButton>
                                    <Modal.Title>Update My Profile</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{width: '100%'}}>
                                    <label>
                                        <input type='text'
                                        name="username"
                                        value={this.state.username}
                                        placeholder="username"
                                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                                        onChange={this.onChange} />
                                    </label>
                                    <label>
                                        <input type='text'
                                        name="bio"
                                        value={this.state.bio}
                                        placeholder="bio"
                                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                                        onChange={this.onChange} />
                                    </label>
                                    <label>
                                        <input type='text'
                                        name="location"
                                        value={this.state.location}
                                        placeholder="location"
                                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                                        onChange={this.onChange} />
                                    </label>
                                    <label>
                                        <input type='text'
                                        name="website"
                                        value={this.state.website}
                                        placeholder="website"
                                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                                        onChange={this.onChange} />
                                    </label>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                    style={btnStyle}
                                    onClick={this.handleClose3}>
                                        Close
                                    </button>
                                    <input 
                                    style={btnStyle}
                                    type="submit" value="update"/>
                                </Modal.Footer>
                            </form>
                        </Modal>

                        <Modal show={this.state.show4} onHide={this.handleClose4}>
                            <form onSubmit={this.onSubmitPic}> 
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Pic</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <label>
                                        
                                        <input 
                                        type='file'
                                        onChange={this.onChangePic} />
                                    </label>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button 
                                    style={btnStyle} 
                                    onClick={this.handleClose4}>
                                        Close
                                    </button>
                                    <input 
                                    style={btnStyle}
                                    type="submit" 
                                    value="update"/>
                                </Modal.Footer>
                            </form>
                        </Modal>

                        

                        <div className='display-flex'>
                            <div className="profile">
                                <div className='profile-pic'>
                                    {(currentUser.data.pic)? (
                                        <img style={{width: '20%'}} src={`data:image/png;base64,${currentUser.data.pic}`} alt='jpg'/>
                                    ): (null)}
                                    <div className='profile-pic-btn' style={{margin: '1%'}}><PhotoIcon style={{ fontSize: 30, color: '#2196f3', cursor: 'pointer'}} onClick={this.handleShow4}></PhotoIcon></div>
                                </div>
                                <div className='profile-details'>
                                    <p style={{ fontWeight: 'bold', fontSize: 'x-large'}}>{currentUser.data.credentials.username}</p>
                                    {(currentUser.data.credentials.location)? (<p>From: {currentUser.data.credentials.location}</p>): (null)}
                                    {(currentUser.data.credentials.bio)? (<p>About: {currentUser.data.credentials.bio}</p>): (null)}
                                    {(currentUser.data.credentials.website)? (<p>{currentUser.data.credentials.website}</p>): (null)}
                                    <p>Joined: <ReactTimeAgo date={currentUser.data.credentials.joinDate} locale="en-US"/></p>
                                    <Button variant="primary" onClick={this.handleShow3}>Update Profile</Button>
                                </div>
                            </div>
                            <div className='post-container'>
                                {displayposts}
                            </div>
                        </div>
                    
                    </ React.Fragment>
                } else {
                    display = 
                    <div style={{ 
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CircularProgress/>
                    </div>
                }
                
        
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
        unlikePost: (like) => dispatch(unlikePost(like)),
        updateUser: (user) => dispatch(updateUser(user)),
        getAuthenticated: () => dispatch(getAuthenticated()),
    }
}

const btnStyle = {
    background: '#2196f3', 
    color: 'white', 
    border: 'none', 
    cursor: 'pointer', 
    padding: '3%'
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)