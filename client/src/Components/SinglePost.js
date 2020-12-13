import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios'
import { getPost, addComment, deleteComment } from '../Actions/Posts'


class SinglePost extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            //currentUser: '',
            posts: [],
            post: '',
            comment: '',
            loading: '' 
        }
    }

    onChange = (e) => {
        console.log(this.state.comment)
        this.setState({[e.target.name]: e.target.value})
    }

    submitComment = (e)=> {
    
        e.preventDefault();

        if(this.state.comment != '') {
            console.log('not blank')
            let newComment = {
                body: this.state.comment,
                user: this.props.currentUser.credentials.username,
                postId: this.props.postId
            }

            console.log(newComment)
            this.props.addComment(newComment)
            this.setState({ comment: '' })
        }
    }
 
    componentDidMount(){
        console.log('didMount')
        this.props.getPost(this.props.postId)
    }
 
 
    deleteComment = (comment) => {

        console.log(comment)
        
        this.props.deleteComment(comment)
    }

    
    render() {

    
        console.log(this.props)
        //console.log(this.props.post + ' and ' + this.state.loading)
        const { post, currentUser, postId } = this.props

        let display 
        let displayComments 
        let deletedisplay 

        /*
        When the post is clicked after closing another post:
        1st rendering loadingPost is false so the ...loading div 
        doesn't show up.
        2nd rendering is after the componentDidMount calls getPost 
        and loadingPost is set to 'true' while post is being fetched. 
        Therefore, we see the ...loading div while it is fetching.
        3rd rendering happens when the new post is recieved hence the 
        new post is displayed.
        */
        if( !post ) {
            console.log('first round')
            display = 
            <div style={{ 
                height: '40vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}
            > 
                <CircularProgress />
            </div>
        } else {


            /*don't display previously opened post 
            during the first render */
            if(post.data._id === postId) {

                displayComments = post.data.comments.map(comment => {


                    if(comment.user == currentUser.credentials.username) {
                        deletedisplay = <button onClick={this.deleteComment.bind(this, comment)} >
                                    x
                                </button>
                    } else deletedisplay = ''


                    return (
                        <div className='comment' key={comment._id} >
                            <div className='comment-pic'>
                                {(comment.pic)? (
                                    <img src={`data:image/png;base64,${comment.pic}`} alt='jpg'></img>
                                    ): (<div className='comment-pic-second'></div>)}
                            </div>
                            <div className='comment-right'>
                                <div className='comment-right-top'>
                                    <div className='comment-name'><Link style={{ textDecoration: 'none'}} to={`/User/${comment.user}`} style={{ fontWeight: 'bold'}}>{comment.user}</Link></div>
                                    <div className='comment-time'><ReactTimeAgo date={comment.createdAt} locale="en-US"/></div>
                                    <div className='comment-delete'>{deletedisplay}</div>
                                </div>
                                <div className='comment-body'>{comment.body} </div>
                            </div>
                            
                        </div>
                    )
                
                })

                display = 
                    <div>
                        <div className='post'>
                            <div className='post-pic'>
                                {(post.data.pic)? (
                                    <img src={`data:image/png;base64,${post.data.pic}`} alt='jpg'/>
                                ): (<div className='post-pic-second'></div>)}
                            </div>
                            <div className='post-right'>
                                <div className='post-right-top'>
                                    <div className='post-name'><Link style={{ textDecoration: 'none'}} to={`/User/${post.data.user}`} style={{ fontWeight: 'bold'}}>{post.data.user}</Link></div>
                                    <div className='post-time'><ReactTimeAgo date={post.data.createdAt} locale="en-US"/></div>
                                </div>
                                <div className='post-body'>{post.data.body}</div>
                            </div>
                        </div>          
                        <br></br>    
                        {displayComments}
                        <br></br>   
                        <br></br> 
                        <div className='input-container'>
                            <form onSubmit={this.submitComment}> 
                                <div className='text-cont'>
                                    <input 
                                    className='input-text'
                                    type='text'
                                    name="comment"
                                    value={this.state.comment}
                                    placeholder="write a comment"
                                    onChange={this.onChange} />
                                </div>
                                <div className='submit-cont'>
                                    <input 
                                    className='input-submit'
                                    type="submit" 
                                    value="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
            } else {
                display = 
                <div style={{ 
                    height: '40vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}}
                > 
                    <CircularProgress />
                </div>
            }
            
    
        }
        
  
        return (
            <React.Fragment>
                {display}
            </React.Fragment>
        )
    }
}

const mapStateToProps = ( state ) => {

    return {
        post: state.Data.post,
        currentUser: state.Authenticate.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPost: (postId) => dispatch(getPost(postId)),
        addComment: (newComment) => dispatch(addComment(newComment)),
        deleteComment: (comment) => dispatch(deleteComment(comment))
    }
}

const btnStyle = {
    background: '#2196f3', 
    color: 'white', 
    border: 'none', 
    cursor: 'pointer', 
    padding: '3%'
}
export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)