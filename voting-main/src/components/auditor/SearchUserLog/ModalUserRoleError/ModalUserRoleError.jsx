import React from "react";
import {Modal} from 'antd';
import "./ModalUserRoleError.css";

const ModalUserRoleError = (props) => {
    let isVisible = props.isVisible;
    const handleCancel = props.handleCancel;

    return <div className="Modal_window_rec">
        <Modal title="Данные о пользователе по логину:" 
        visible={isVisible} onCancel={handleCancel} footer={null}>
          <div className='title_text'>Произошла ошибка!</div>
          <div className='title_text'>Возможно неправильно введён логин или 
          потеряно соединение с интернетом!</div>
          <div className='title_text'>Пожалуйста повторите попытку позже</div>
       </Modal>
    </div>
}

export default ModalUserRoleError;