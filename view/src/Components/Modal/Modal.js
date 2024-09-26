import React, { useEffect, useRef, useState } from "react";
import './modal.css';

//User Account details Edit Modal Dialog
export default function Modal({ isOpen, onClose, children}) {
    //handle open/close dialog
    const [ isModalOpen, setModalOpen ] = useState(isOpen);
    const mRef = useRef(null);
    
    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {    
        const modalElement = mRef.current;        
        if(modalElement) {
            if (isModalOpen){
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    //handle close model
    const handleCloseModal = () => {
        if (onClose) {   
          onClose();
        }
        setModalOpen(false);
    };

    //close when escape key presses
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            handleCloseModal();
        }
    }

    return (
        <dialog className="user-edit-dialog px-2 px-sm-4 pt-4 pb-4" ref={mRef}  onKeyDown={handleKeyDown}>
            <div className="container">                
                <div className="row">
                    <div className="d-flex justify-content-end">
                        <button className="modal-close-btn px-2"  onClick={handleCloseModal}>
                            X
                        </button>
                    </div>
                </div>
                <div className="row pe-2">
                    <div className="col">
                        {children}
                    </div>                
                </div>            
            </div>
        </dialog>
    );    
}