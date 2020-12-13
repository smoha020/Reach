import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import btnStyle from './btnStyle'


function OnHide(props) {
    props.handleClose3()
}

function OnSubmit(e, props) {
    props.onSubmitProfile(e)
}

function OnChange(e, props) {
    props.onChange(e)
}

function OnClick(props) {
    props.handleClose3()
}


function ModalUpdateProfile(props) {

    const { show3, handleClose3, onSubmitProfile,
            onChange, username, bio, location, website,
     } = props

    console.log(props)
    return (
        <Modal show={show3} onHide={() => {OnHide(props)}}>
            <form onSubmit={(e) => {OnSubmit(e, props)}}> 
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
                        onChange={(e) => {OnChange(e, props)}} />
                    </label>
                    <label>
                        <input type='text'
                        name="bio"
                        value={bio}
                        placeholder="bio"
                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                        onChange={(e) => {OnChange(e, props)}} />
                    </label>
                    <label>
                        <input type='text'
                        name="location"
                        value={location}
                        placeholder="location"
                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                        onChange={(e) => {OnChange(e, props)}} />
                    </label>
                    <label>
                        <input type='text'
                        name="website"
                        value={website}
                        placeholder="website"
                        style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                        onChange={(e) => {OnChange(e, props)}} />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <button
                    style={btnStyle()}
                    onClick={() => {OnClick(props)}}>
                        Close
                    </button>
                    <input 
                    style={btnStyle()}
                    type="submit" value="update"/>
                </Modal.Footer>
            </form>
        </Modal>
    )   
}


export default ModalUpdateProfile