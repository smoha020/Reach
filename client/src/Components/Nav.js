import React, { Component } from 'react'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostAddIcon from '@material-ui/icons/PostAdd';



function Nav(props) {

    const { notesColor, noteCount, visible, notesDisplay, handleShow, logOut, changeNotes } = props
    return (
        <div className='my-nav'>
            <div className='brand-name'>Reach</div>
            <div className='move-right'>   
                <div className='notes-display'>
                    <Badge className='notes-icon' color="secondary" badgeContent={(noteCount.length != 0)?(noteCount.length):(0)}>
                        <NotificationsIcon  style={{ fontSize: 40, color: `${notesColor}` }} onClick={changeNotes}></NotificationsIcon>
                    </Badge>
                    {(visible)? (
                        <div className='notes-menu'>
                            {notesDisplay}
                        </div>): (null)}
                </div>
                <PostAddIcon className='post-icon' style={{ fontSize: 40 }} onClick={handleShow}></PostAddIcon>  
                <div onClick={logOut} className='log-out'>Log Out</div>    
            </div>   
        </div>
    )
    
}

export default Nav