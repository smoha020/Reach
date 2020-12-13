import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import btnStyle from './btnStyle'


function OnHide(props) {
    props.handleClose4()
}

function OnSubmit(e, props) {
    props.onSubmitPic(e)
}

function OnChange(e, props) {
    props.onChangePic(e)
}

function OnClick(props) {
    props.handleClose4()
}



function ModalPic(props) {

    const { show4, handleClose4, onSubmitPic, onChangePic } = props

    console.log(props)
    return (
        <Modal show={show4} onHide={() => {OnHide(props)}}>
            <form onSubmit={(e) => {OnSubmit(e, props)}}> 
                <Modal.Header closeButton>
                    <Modal.Title>Update Pic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                        <input 
                        type='file'
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
                    type="submit" 
                    value="update"/>
                </Modal.Footer>
            </form>
        </Modal>
    )   
}

export default ModalPic