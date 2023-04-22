import React from "react";
import '../../assets/styles/Modals/ComboModal.css';
import Modal from "react-modal";
import {deselectOptions} from "@testing-library/user-event/dist/select-options";
Modal.setAppElement('#myModal');
function ComboModal({isOpen, onAfterOpen, onRequestClose, old_value , title , field_title , data}) {
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
                        <select>
                            {
                                data && data.map((d)=>{
                                    return(
                                        <option key={d.id}>{d.value}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="md-action">
                        <button onClick={onRequestClose}>ثبت</button>
                    </div>
                </div>
            </Modal>
        )
}

export default ComboModal;