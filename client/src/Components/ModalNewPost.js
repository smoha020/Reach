import React from 'react'
import Modal from 'react-bootstrap/Modal';
import btnStyle from './btnStyle'


function ModalNewPost(props) {

    const { show, handleClose, onSubmit, body, onChange } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={onSubmit}> 
                <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: '100%'}}>
                    <textarea
                    type='text'
                    name="body"
                    value={body}
                    style={{ background: 'rgb(230, 234, 247)', width: '90%'}}
                    onChange={(e) => {onChange(e)}} />
                </Modal.Body>
                <Modal.Footer>
                    <p
                    style={btnStyle()} 
                    onClick={handleClose}>
                        Close
                    </p>
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