import React from 'react'
import Profile from './Profile'
import ModalNewPost from './ModalNewPost'
import ModalPic from './ModalPic'
import ModalSinglePost from './ModalSinglePost'
import ModalUpdateProfile from './ModalUpdateProfile'
import DisplayPosts from './DisplayPosts'



function CurrentUser(props){

    const { currentUser, posts, body, deletePost, likes, disabled, clickLike, 
            clickUnlike, handleShow2, show, handleClose, onSubmit, show2, 
            handleClose2, postId, show3, handleClose3, onSubmitProfile, onChange, 
            username, bio, location, website, show4, handleClose4, onSubmitPic, 
            onChangePic, handleShow4, handleShow3 } = props

    console.log(props)
    let displayposts
    displayposts = 
        <DisplayPosts posts={posts} currentUser={currentUser} deletePost={deletePost} 
        likes={likes} disabled={disabled} clickLike={clickLike} 
        clickUnlike={clickUnlike} handleShow2={handleShow2} />

    return (
        <React.Fragment>
            <ModalNewPost show={show} handleClose={handleClose}
            onSubmit={onSubmit} body={body} onChange={onChange} />

            <ModalSinglePost show2={show2} handleClose2={handleClose2}
            postId={postId} />

            <ModalUpdateProfile show3={show3} handleClose3={handleClose3}
            onSubmitProfile={onSubmitProfile} onChange={onChange}
            username={username} bio={bio} location={location}
            website={website} />
            
            <ModalPic show4={show4} handleClose4={handleClose4}
            onSubmitPic={onSubmitPic} onChangePic={onChangePic} />

            <div className='display-flex'>
                <Profile user={currentUser} handleShow4={handleShow4}
                handleShow3={handleShow3} />
                <div className='post-container'>
                    {displayposts}
                </div>
            </div>
        </ React.Fragment>
    )
}

export default CurrentUser