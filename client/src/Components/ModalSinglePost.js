import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import SinglePost from './SinglePost'

function OnHide(props) {
    props.handleClose2()
}

function ModalSinglePost(props) {

    const { show2, handleClose2, postId } = props

    console.log(props)
    return (
        <Modal show={show2} onHide={() => {OnHide(props)}}>
            <Modal.Header closeButton>
                <Modal.Title>Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SinglePost postId={postId}/>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )   
}

export default ModalSinglePost