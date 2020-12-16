import React, { Component }from 'react';
import Profile from './Profile'
import ModalNewPost from './ModalNewPost'
import ModalPic from './ModalPic'
import ModalSinglePost from './ModalSinglePost'
import LoadSpinner from './LoadSpinner'
import ModalUpdateProfile from './ModalUpdateProfile'
import DisplayPosts from './DisplayPosts'
import { connect } from 'react-redux';
import { getOtherUser } from '../Actions/Posts'

class User extends Component {

    componentDidMount(){
        console.log('componentDidMount User')
        this.props.getOtherUser(this.props.match.params.user)
    }

    render() {

        const { otherUser, currentUser, posts, body, deletePost, likes, disabled, clickLike, 
            clickUnlike, handleShow2, show, handleClose, onSubmit, show2, 
            handleClose2, postId, show3, handleClose3, onSubmitProfile, onChange, 
            username, bio, location, website, show4, handleClose4, onSubmitPic, 
            onChangePic, handleShow4, handleShow3, match } = this.props

        let userPosts
        let displayposts


        //for initial rendering while call in componentDidMount is firing
        if(otherUser) {

            /*Previous user will be displayed before the 
            finel rendering, this prevents that*/
            if(match.params.user === otherUser.credentials.username) {
                let nameCheck = currentUser.credentials.username
                console.log(nameCheck)
                userPosts = otherUser.posts
                console.log(this.props)
                displayposts = 
                    <DisplayPosts posts={userPosts} currentUser={currentUser} deletePost={deletePost} 
                    likes={likes} disabled={disabled} clickLike={clickLike} 
                    clickUnlike={clickUnlike} handleShow2={handleShow2} />

                return (
                    <React.Fragment>
                        <ModalNewPost show={show} handleClose={handleClose}
                        onSubmit={onSubmit} body={body} onChange={onChange} />

                        <ModalSinglePost show2={show2} handleClose2={handleClose2}
                        postId={postId} />

                        {/* ----WE CAN ONLY UPDATE PROFILE AND 
                                PIC IF THE USER IS CURRENTUSER ------ */ }

                        {(nameCheck === otherUser.credentials.username)? (
                            <React.Fragment>
                                <ModalUpdateProfile show3={show3} handleClose3={handleClose3}
                                onSubmitProfile={onSubmitProfile} onChange={onChange}
                                username={username} bio={bio} location={location}
                                website={website} />
                                
                                <ModalPic show4={show4} handleClose4={handleClose4}
                                onSubmitPic={onSubmitPic} onChangePic={onChangePic} />
                            </React.Fragment>
                        ): (null)}
                        

                        <div className='display-flex'>
                            <Profile user={otherUser} nameCheck={nameCheck} handleShow4={handleShow4}
                            handleShow3={handleShow3} />
                            <div className='post-container'>
                                {displayposts}
                            </div>
                        </div>
                    </ React.Fragment>
                )
            } else {
                return (
                    <loadingPost />
                )
            }
        } else {
            return <LoadSpinner />
        }
    }
}


const mapStateToProps = state => {
    return {
        otherUser: state.Data.otherUser,
        //currentUser: state.Authenticate.currentUser,
        //likes: state.Authenticate.likes,
        loadingPost: state.Data.loadingPost,
        //allPosts: state.Data.posts,
    }
}


const mapDispatchToProps = dispatch => {

    return {
        getOtherUser: (user) => dispatch(getOtherUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);