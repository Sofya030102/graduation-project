import React from "react";
import {Modal} from 'antd';
import "./RecKeyPopUp.css";

const RecKeyPopUp = (props) => {
    let isVisible = props.isVisible;
    const handleCancel = props.handleCancel;

    return <div className="Modal_window_rec">
        <Modal title="Восстановление ключа:" 
        visible={isVisible} onCancel={handleCancel} footer={null}>
          <div className='title_text'>Полученный ключ:</div>
          <div className='title_text'>{props.Reckey}</div>
       </Modal>
    </div>
}

export default RecKeyPopUp;