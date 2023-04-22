import React from "react";
import '../../assets/styles/Modals/ChangeSingleParameterModal.css';
import Modal from "react-modal";
Modal.setAppElement('#myModal');
function ChangeSingleParameterModal({isOpen, onAfterOpen, onRequestClose, old_value , title , field_title}) {
    if (!isOpen){return null} else
    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
            className="md"
            overlayClassName="ol"
        >
            <div className={'md-container'}>
                    <span onClick={()=>{onRequestClose()}} className={'close'}>X</span>
                <div className="md-top">
                    <span>{title}</span>
                </div>
                <div className="md-body">
                    <span>{field_title}</span>
                    <input type={"text"} value={old_value}/>
                </div>
                <div className="md-action">
                    <button onClick={onRequestClose}>ثبت</button>
                </div>
            </div>
        </Modal>
    )
}

export default ChangeSingleParameterModal;