import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { getOtherUser, likePost, unlikePost } from '../Actions/Posts'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class User extends Component {

    clickLike = (id, e ) => {
        e.preventDefault()
        
        let button = e.target
        button.disabled = true

        setTimeout(function() {
            button.disabled = false;
        }, 2500)

        let like = {
            postId: id,
            user: this.props.otherUser.data.credentials.username
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
            user: this.props.otherUser.data.credentials.username
        }
        this.props.unlikePost(like)
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
            if(currentUser && currentUser.data != '') {
                console.log('first round')
                display = <div>...loading</div>
            } else {
                console.log('not logged in')
                display = <div>...not logged in </div>
                this.props.history.push('/LogIn')
            }
        } else {
            displayposts = otherUser.data.posts.map(post => {
                thumbsLogo = []
                thumbsLogo = likes.map(like => {
                    if(like.postId === post._id) {
                        return post._id
                    } 
                })

                return (
                    <div className='post' key={post._id}>
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
                )
            })

            display = 
            <React.Fragment>
                <ul>
                    <li className="company"><a style={{color: 'white'}}>NewsQuest</a></li>
                    <li><Link to='/Dashboard'><Button>Dashboard Logo</Button></Link></li>
                    <li><Button onClick={this.logOut}>Log Out</Button></li>
                    <Button variant="primary" onClick={this.handleShow}> Add Post </Button>              
                </ul>
                <div className='display-flex'>
                    <div className='post-container'>
                        {displayposts}
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