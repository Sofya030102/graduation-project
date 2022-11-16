import React from "react";
import {Modal} from 'antd';
import "./ErrRecKeyPopUp.css";

const ErrRecKeyPopUp = (props) => {
    let isVisible = props.isVisible;
    const handleCancel = props.handleCancel;

    return <div className="Modal_window_rec">
        <Modal title="Восстановление ключа:" 
        visible={isVisible} onCancel={handleCancel} footer={null}>
          <div className='title_text'>Произошла ошибка!</div>
          <div className='title_text'>Возможно неправильно введён адрес e-mail или 
          потеряно соединение с интернетом!</div>
          <div className='title_text'>Пожалуйста повторите попытку позже</div>
       </Modal>
    </div>
}

export default ErrRecKeyPopUp;