import React, { Component } from 'react'

class CommentInput extends Component {

    render() {
        console.log('inside commentInput')
        console.log(this.props)
        return(
            <React.Fragment>
                <form onSubmit={this.props.submitComment.bind(this, this.props.post)}>
                        <label>
                            Make A Comment 
                            <input type='text' 
                            name='comment'
                            value={this.props.comment}
                            onChange={this.props.onChange}/>   
                        </label>
                        <input type='submit' value='submit'/>
                </form>
            </React.Fragment>
        )
    }
}

export default CommentInput