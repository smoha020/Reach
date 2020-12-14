import React from 'react'
import Modal from 'react-bootstrap/Modal';
import SinglePost from './SinglePost'


function ModalSinglePost(props) {

    const { show2, handleClose2, postId } = props

    console.log(props)
    return (
        <Modal show={show2} onHide={handleClose2}>
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