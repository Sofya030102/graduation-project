import React from "react";
import {Modal} from 'antd';
import "./ModalUserRole.css";

const ModalUserRole = (props) => {
    let isVisible = props.isVisible;
    const handleCancel = props.handleCancel;

    return <div className="Modal_window_rec">
        <Modal title="Данные о пользователе по логину:" 
        visible={isVisible} onCancel={handleCancel} footer={null}>
          <div className='title_text'>Роль пользователя:</div>
          <div className='title_text'>{props.UserRole}</div>
       </Modal>
    </div>
}

export default ModalUserRole;