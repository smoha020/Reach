import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import btnStyle from './btnStyle'


function ModalPic(props) {

    const { show4, handleClose4, onSubmitPic, onChangePic } = props

    return (
        <Modal show={show4} onHide={handleClose4}>
            <form onSubmit={(e) => {onSubmitPic(e)}}> 
                <Modal.Header closeButton>
                    <Modal.Title>Update Pic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                        <input 
                        type='file'
                        onChange={(e) => {onChangePic(e)}} />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <p 
                    style={btnStyle()} 
                    onClick={handleClose4}>
                        Close
                    </p>
                    <input 
                    style={btnStyle()}
                    type="submit" 
                    value="update"/>
                </Modal.Footer>
            </form>
        </Modal>
    )   
}

export default ModalPic