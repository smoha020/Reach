import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import btnStyle from './btnStyle'


function OnHide(props) {
    props.handleClose()
}

function OnSubmit(e, props) {
    props.onSubmit(e)
}

function OnChange(e, props) {
    props.onChange(e)
}

function OnClick(props) {
    props.handleClose()
}



function ModalNewPost(props) {

    const { show, handleClose, onSubmit, post, onChange } = props

    console.log(props)
    return (
        <Modal show={show} onHide={() => {OnHide(props)}}>
            <form onSubmit={(e) => {OnSubmit(e, props)}}> 
                <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: '100%'}}>
                    <textarea
                    type='text'
                    name="post"
                    value={post}
                    style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                    onChange={(e) => {OnChange(e, props)}} />
                </Modal.Body>
                <Modal.Footer>
                    <button 
                    style={btnStyle()} 
                    onClick={() => {OnClick(props)}}>
                        Close
                    </button>
                    <input 
                    style={btnStyle()} 
                    type="submit" 
                    value="post"/>
                </Modal.Footer>
            </form>
        </Modal>
    )   
}

export default ModalNewPost