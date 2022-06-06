import React from 'react';

const Modal = ({meal}) => {
    return (
        <div className="modalContainer">
            <div className="modal">
                {meal.title}
            </div>
        </div>
    )
}

export default Modal;