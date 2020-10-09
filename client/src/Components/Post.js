import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import axios from 'axios'


class Post extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            //currentUser: '',
            posts: [],
            post: '',
            comment: ''
        }
    }

    onChange = (e) => {
        console.log(this.state.comment)
        this.setState({[e.target.name]: e.target.value})
    }

    submitComment = (e)=> {
    
        e.preventDefault();

        /*console.log('here is a comment')
        console.log(this.state.comment)
        
        console.log(this.props.post._id)*/
        
        let currentUser = this.props.isAuthenticated.data.email

        let newcomment = {
            comment: this.state.comment,
            sender: currentUser,
            reciever: this.props.post.user
        }

        console.log(newcomment)
        let link = `/social/posts/createcomment/${this.props.post._id}`

        /*SINCE WE'RE NOT CHANGING THE REDUX STATE 
        WE WILL JUST MAKE THE AXIOS CALL HERE */
        axios.put(link, newcomment)
        .then(res =>  this.props.history.push('/Dashboard'))
        .catch(err => err)
        
    }

    /*deleteComment = (comment) => {
        console.log(comment)
        console.log(this.props.match.params._id)
        console.log(comment._id)

        axios.put(`/social/posts/deletecomment/${this.props.post._id}`, comment)
        .then(res =>  this.props.history.push('/Dashboard'))
        .catch(err => err)
    }*/

    
    render() {

        console.log(this.props)

        let deletedisplay 

        /*let commentdisplay = this.props.post.comments.map(comment => {

            if(comment.sender == this.props.isAuthenticated.data.email) {
                deletedisplay = <button onClick={this.deleteComment.bind(this, comment)} style={{color: 'white'}, {background: 'red'}}>
                            X
                        </button>
            } else deletedisplay = ''


            return <p key={comment._id} >{deletedisplay}{comment.comment}</p>
        })*/

        return (
            <React.Fragment>
                <div /*className='post'*/>
                        <p>{this.props.post.user}</p>
                        <p>{this.props.post._id}</p>
                        <p>{/*this.props.post.body*/}</p>
                </div>
                {/*<div>
                    <form onSubmit={this.submitComment}>
                        <label>
                            Make A Comment 
                            <input type='text' 
                            name='comment'
                            value={this.state.comment}
                            onChange={this.onChange}/>   
                        </label>
                    </form>
                </div>*/}
                {/*<CommentInput submitComment={this.submitComment} 
                onChange={this.onChange}
                post={post}
        comment={this.state.comment}/>*/}
            </React.Fragment>
        )
    }
}

export default Post
/*const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params._id;

    return {
        post: state.Posts.posts.find(post => post._id === id),
        isAuthenticated: state.Authenticate.isAuthenticated
    }
}



export default connect(mapStateToProps)(Post)*/