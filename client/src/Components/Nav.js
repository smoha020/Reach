import React, { Component } from 'react'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';



function Nav(props) {

    console.log(props)
    const { currentUser, allPosts, notesColor, visible, 
            handleShow, handleShow2, logOut, param, changeNotes } = props

    console.log(props)
    /*We use this to get the number in the red 
    circle on the notifications*/
    let notesDisplay
    let noteCount = []
    notesDisplay = currentUser.notifications.map((note, index) => {
        let myPost = allPosts.find( post => {
            return (post._id === note.postId) 
        })
        
        if(myPost) {
            noteCount = [...noteCount, myPost]
            console.log('myPost is not undefined: ' + noteCount)
            if(note.notType === 'like') { 

                return <div key={index} variant="primary" onClick={() => {handleShow2(myPost, note)}}>{note.sender} liked your post </div>
            } else {
                return <div key={index} variant="primary" onClick={() => {handleShow2(myPost, note)}}>{note.sender} commented on your post </div>
            }
        } else return null
    })

    return (
        <div className='my-nav'>
            <div className='brand-name'>Reach</div>
            <div className='move-right'>   
                <div className='notes-display'>
                    <Badge className='notes-icon' color="secondary" badgeContent={(noteCount.length != 0)?(noteCount.length):(0)}>
                        <NotificationsIcon  style={{ fontSize: 30, color: `${notesColor}` }} onClick={changeNotes}></NotificationsIcon>
                    </Badge>
                    {(visible)? (
                        <div className='notes-menu'>
                            {notesDisplay}
                        </div>): (null)}
                </div>
                {(param === currentUser.credentials.username || param === 'CurrentUser' )? (
                        <PostAddIcon className='post-icon' style={{ fontSize: 30 }} onClick={handleShow}>
                        </PostAddIcon>
                    ): (
                        <Link style={{ textDecoration: 'none'}} to={'/Dashboard/CurrentUser'}>
                            <HomeIcon className='post-icon' style={{ fontSize: 30 }}></HomeIcon>
                        </Link>
                    )}
                <div onClick={logOut} className='log-out'>Log Out</div>    
            </div>   
        </div>
    )
    
}

export default Nav