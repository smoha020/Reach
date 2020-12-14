import React from 'react'
import Modal from 'react-bootstrap/Modal';
import btnStyle from './btnStyle'


function ModalUpdateProfile(props) {

    const { show3, handleClose3, onSubmitProfile,
            onChange, username, bio, location, website,
     } = props

    return (
        <Modal show={show3} onHide={handleClose3}>
            <form onSubmit={onSubmitProfile}> 
                <Modal.Header closeButton>
                    <Modal.Title>Update My Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: '100%'}}>
                    <label>
                        <input type='text'
                        name="username"
                        value={username}
                        placeholder="username"
                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                        onChange={(e) => {onChange(e)}} />
                    </label>
                    <label>
                        <input type='text'
                        name="bio"
                        value={bio}
                        placeholder="bio"
                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                        onChange={(e) => {onChange(e)}} />
                    </label>
                    <label>
                        <input type='text'
                        name="location"
                        value={location}
                        placeholder="location"
                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                        onChange={(e) => {onChange(e)}} />
                    </label>
                    <label>
                        <input type='text'
                        name="website"
                        value={website}
                        placeholder="website"
                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                        onChange={(e) => {onChange(e)}} />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <p
                    style={btnStyle()}
                    onClick={handleClose3}>
                        Close
                    </p>
                    <input 
                    style={btnStyle()}
                    type="submit" value="update"/>
                </Modal.Footer>
            </form>
        </Modal>
    )   
}


export default ModalUpdateProfile