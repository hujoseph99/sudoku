import React from 'react';
import ReactModal from 'react-modal';


/*
 * Textbox is a react component that displays a modal-like textbox for the user.
 * props:
 *      text: JSX that represents what will fill the textbox.
 *      boxWidth: width of the box
 *      boxHeight: height of the box
 *      modalOpen: boolean value that represents whether or not the modal box should be displayed.
 *      handleCloseModal: a function that handles when the modal should be closed.
 */
export default function TextBox(props) {
  const style = {
    overlay: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      margin: 'auto',
      width: props.boxWidth ? props.boxWidth : '50%',
      height: props.boxHeight ? props.boxHeight : '50%',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  };
  return (
    <ReactModal
      isOpen={props.modalOpen}
      contentLabel="Modal Example"
      onRequestClose={props.handleCloseModal}
      shouldCloseOnOverlayClick={true}
      style={style}
    >
      {props.text}
    </ReactModal>
  )
  

}