import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { getPosts, createPost, deletePost, likePost, unlikePost, getOtherUser } from '../Actions/Posts'
import { signOut, updateUser, getAuthenticated, NoteRead } from '../Actions/Authenticated'
import { connect } from 'react-redux';
import SinglePost from './SinglePost'
import Nav from './Nav'
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
import DisplayPosts from './DisplayPosts';

class User extends Component {
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

        this.setState({
            show2: true, 
            postId: post._id
        })

        
        if(note.read === false) {
            this.props.NoteRead(note)
        }
        
    }

    handleClose2 = () => {

        if(this.state.visible == true) {
            this.setState({show2: false});
            console.log('refresh?')
        } else {
            this.setState({show2: false});
            console.log('inside handleClose2')
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
 
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onChangeFile = (e) => {
        this.setState({ pic: e.target.files[0] })
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        

        let newpost = {
            body: this.state.post,
            user: this.props.currentUser.credentials.username,
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
            user: this.props.currentUser.credentials.username
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
            user: this.props.currentUser.credentials.username
        }
        this.props.unlikePost(like)
    }

    onSubmitProfile = (e) => {
        e.preventDefault()

        let user = {
            _id: this.props.currentUser.credentials._id,
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
    
    logOut = () => { 
        this.props.signOut()
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

    componentDidMount(){
        this.props.getOtherUser(this.props.match.params.user)
    }

    render() {
        const { loadingPost, otherUser, currentUser, likes } = this.props
        console.log(this.props)

        let display 
        let displayposts
        let thumbsLogo
        
        if( loadingPost === undefined || loadingPost == true) {
            if(currentUser && currentUser.credentials != '') {
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
                this.props.history.push('/LogIn')
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
            }
        } else {
            /*displayposts = otherUser.data.posts.map(post => {
                thumbsLogo = []
                thumbsLogo = likes.map(like => {
                    if(like.postId === post._id) {
                        return post._id
                    } 
                })

                return (
                    <React.Fragment key={index}>
                        <DisplayPosts posts={otherUser.data.posts} />

                        <div className='post'>
                            <div className='post-pic'>
                                {(post.pic)? (
                                    <Link style={{ textDecoration: 'none'}} to={`/User/${post.user}`}>
                                        <img src={`data:image/png;base64,${post.pic}`} alt='jpg'/>
                                    </Link>
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
            })*/

            display = 
            <React.Fragment>
                <div className='display-flex'>
                    <div className='post-container'>
                        {/*displayposts*/}
                    </div>        
                    <div className="profile">
                        {(otherUser.data.credentials.pic)? (<p>{otherUser.data.credentials.pic}</p>): (null)}
                        <p>{otherUser.data.credentials.username}</p>
                        {(otherUser.data.credentials.location)? (<p>{otherUser.data.credentials.location}</p>): (null)}
                        {(otherUser.data.credentials.bio)? (<p>{otherUser.data.credentials.bio}</p>): (null)}
                        {(otherUser.data.credentials.website)? (<p>{otherUser.data.credentials.website}</p>): (null)}
                        <p>Joined: {otherUser.data.credentials.joinDate}</p>
                        <Button variant="primary" onClick={this.handleShow3}>Update Profile</Button>
                    </div>
                </div>
            </React.Fragment>
        }
        return(
            <React.Fragment>{display}</React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        otherUser: state.Data.otherUser,
        currentUser: state.Authenticate.currentUser,
        likes: state.Authenticate.likes,
        loadingPost: state.Data.loadingPost
    }
}


const mapDispatchToProps = dispatch => {

    return {
        getOtherUser: (user) => dispatch(getOtherUser(user)),
        likePost: (like) => dispatch(likePost(like)),
        unlikePost: (like) => dispatch(unlikePost(like))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);