import React from 'react'
import PhotoIcon from '@material-ui/icons/Photo';
import ReactTimeAgo from 'react-time-ago'
import Button from 'react-bootstrap/Button';
import btnStyle from './btnStyle'


function Profile(props) {

    const { user, handleShow4, handleShow3 } = props

    
    return (
        <div className="profile">
            <div className='profile-pic'>
                {(user.pic)? (
                    <img src={`data:image/png;base64,${user.pic}`} alt='jpg'/>
                ): (<div className='profile-pic-second'></div>)}
                {/*<div className='profile-pic-btn' style={{margin: '1%'}}>
                    <PhotoIcon style={{ fontSize: 30, color: '#2196f3', cursor: 'pointer'}} onClick={handleShow4}>
                    </PhotoIcon>
                </div>*/}
            </div>
            <div className='profile-details'>
                <p style={{ fontWeight: 'bold', fontSize: 'x-large'}}>{user.credentials.username}</p>
                {(user.credentials.location)? (<p>From: {user.credentials.location}</p>): (null)}
                {(user.credentials.bio)? (<p>About: {user.credentials.bio}</p>): (null)}
                {(user.credentials.website)? (<p>{user.credentials.website}</p>): (null)}
                <p>Joined: <ReactTimeAgo date={user.credentials.joinDate} locale="en-US"/></p>
                {/*(user.credentials.username === nameCheck )?(<Button variant="primary" onClick={handleShow3}>Update Profile</Button>):(null)*/}
            </div>
        </div>
    )   
}

export default Profile