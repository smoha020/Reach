import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import axios from 'axios'
import { getPost, addComment, deleteComment } from '../Actions/Posts'


class Post extends Component {
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

        let newComment = {
            body: this.state.comment,
            user: this.props.currentUser.data.credentials.username,
            postId: this.props.postId
        }

        console.log(newComment)
        this.props.addComment(newComment)
        this.setState({ comment: '' })
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
        const { post, loadingPost, currentUser } = this.props

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
        if( loadingPost === undefined || loadingPost == true) {
            console.log('first round')
            display = <div>...loading</div>
        } else {


            displayComments = post.data.comments.map(comment => {


                if(comment.user == currentUser.data.credentials.username) {
                    deletedisplay = <button onClick={this.deleteComment.bind(this, comment)} style={{color: 'white'}, {background: 'red'}}>
                                X
                            </button>
                } else deletedisplay = ''


                return <p key={comment._id} >{deletedisplay}{comment.body}</p>
               
            })

            

            display = 
                <div className='post'>
                    <p>{post.data.user}</p>
                    <p>{post.data.body}</p>
                    {displayComments}
                    <form onSubmit={this.submitComment}> 
                        <label>
                        Write a comment
                        </label>
                        <input type='text'
                        name="comment"
                        value={this.state.comment}
                        onChange={this.onChange} />
                        <br></br>
                        <input 
                        type="submit" 
                        value="submit"
                        style={btnStyle} />
                    </form>
                </div>
            
    
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
        currentUser: state.Authenticate.currentUser,
        loadingPost: state.Data.loadingPost
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
export default connect(mapStateToProps, mapDispatchToProps)(Post)