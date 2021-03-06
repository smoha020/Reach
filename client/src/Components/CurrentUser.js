import React from 'react'
import Nav from './Nav'
import Profile from './Profile'
import ModalNewPost from './ModalNewPost'
import ModalPic from './ModalPic'
import ModalSinglePost from './ModalSinglePost'
import ModalUpdateProfile from './ModalUpdateProfile'
import DisplayPosts from './DisplayPosts'



function CurrentUser(props){

    const { currentUser, posts, body, notesColor, visible, deletePost, likes, disabled, clickLike, 
            clickUnlike, handleShow, handleShow2, show, handleClose, onSubmit, show2, 
            handleClose2, postId, show3, handleClose3, onSubmitProfile, onChange, 
            username, bio, location, website, show4, handleClose4, onSubmitPic, 
            onChangePic, handleShow4, handleShow3, match, changeNotes, logOut } = props

    console.log(props)
    let displayposts
    let param = 'CurrentUser'
    displayposts = 
        <DisplayPosts posts={posts} currentUser={currentUser} deletePost={deletePost} 
        likes={likes} disabled={disabled} clickLike={clickLike} 
        clickUnlike={clickUnlike} handleShow2={handleShow2} />

    let nameCheck = currentUser.credentials.username

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

            <Nav currentUser={currentUser} allPosts={posts} notesColor={notesColor} 
            visible={visible} handleShow={handleShow} param={param}
            handleShow2={handleShow2} logOut={logOut} changeNotes={changeNotes} />

            <div className='display-flex'>
                <Profile user={currentUser} nameCheck={nameCheck} handleShow4={handleShow4}
                handleShow3={handleShow3} />
                <div className='post-container'>
                    {displayposts}
                </div>
            </div>
        </ React.Fragment>
    )
}

export default CurrentUser