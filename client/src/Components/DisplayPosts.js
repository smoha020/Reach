import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';


function onHandle(post, props) {
    props.handleShow2(post)
}
function onDelete(post, props) {
    props.deletePost(post)
}
function onLike(id, props) {
    props.clickLike(id)
}
function onUnlike(id, props) {
    props.clickUnlike(id)
}

function DisplayPosts(props) {

    const { posts, currentUser, deletePost, likes, 
            disabled, clickLike, clickUnlike, handleShow2 } = props


    let displayposts, deletedisplay, thumbsLogo


    displayposts  = posts.map((post, index) => {
        if(post.user == currentUser.credentials.username) {
            deletedisplay = <button onClick={() => {deletePost(post)}}>
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
                            <Link style={{ textDecoration: 'none'}} to={`/Dashboard/User/${post.user}`}>
                                <img src={`data:image/png;base64,${post.pic}`} alt='jpg'/>
                            </Link>
                        ): (<div className='post-pic-second'></div>)}
                    </div>
                    <div className='post-right'>
                        <div className='post-right-top'>
                            <div className='post-name'><Link style={{ textDecoration: 'none'}} to={`/Dashboard/User/${post.user}`} style={{ fontWeight: 'bold'}}>{post.user}</Link></div>
                            <div className='post-time'><ReactTimeAgo date={post.createdAt} locale="en-US"/></div>
                            <div className='post-delete'>{deletedisplay}</div>
                        </div>
                        <div className='post-body'>{post.body}</div>
                        <div className='post-bottom'>
                            <div className='bottom-thumb'>
                                {( thumbsLogo.includes(post._id) )? (
                                    <button disabled={disabled} onClick={() => {clickUnlike(post._id)}}><ThumbDownIcon style={{ fontSize: 30, color: '#2196f3', cursor: 'pointer'}}></ThumbDownIcon></button>
                                ) : (
                                    <button disabled={disabled} onClick={() => {clickLike(post._id)}}><ThumbUpIcon style={{ fontSize: 30, color: '#2196f3', cursor: 'pointer'}}></ThumbUpIcon></button>
                                )} 
                                <div>{post.likeCount}</div>
                            </div>
                            <div className='bottom-comment'>
                                <div><CommentIcon style={{ fontSize: 30, color: '#2196f3', cursor: 'pointer'}} onClick={() => {handleShow2(post)}}></CommentIcon></div>
                                <div>{post.commentCount}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        )   
    })

    return displayposts 
    
}

export default DisplayPosts