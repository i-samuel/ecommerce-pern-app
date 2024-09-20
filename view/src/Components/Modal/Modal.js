import React, { useEffect, useRef, useState } from "react";
import './modal.css';

export default function Modal({ isOpen, onClose, children}) {
    const [ isModalOpen, setModalOpen ] = useState(isOpen);
    const mRef = useRef(null);
    console.log('dialog', isModalOpen);
    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        console.log('dialog effect',  mRef.current);
        const modalElement = mRef.current;
        console.log('modal element',  modalElement);
        if(modalElement) {
            if (isModalOpen){
                console.log('ttt');
                modalElement.showModal();
            } else {
                console.log('close');
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    const handleCloseModal = () => {
        console.log('in close 1');
        if (onClose) {   
          onClose();
        }
        console.log('in close 2');
        setModalOpen(false);
    };

    const handleKeyDown = (e) => {
        console.log(e);
        if (e.key === "Escape") {
            handleCloseModal();
        }
    }

    return (
        <dialog className="user-edit-dialog px-2 px-sm-4 pt-4 pb-4" ref={mRef}  onKeyDown={handleKeyDown}>
            <div className="container">                
                <div class="row">
                    <div className="d-flex justify-content-end">
                        <button className="modal-close-btn px-2"  onClick={handleCloseModal}>
                            X
                        </button>
                    </div>
                </div>
                <div class="row pe-2">
                    <div class="col">
                        {children}
                    </div>                
                </div>
            
            </div>          
            
            
            
        </dialog>
      );
    
}