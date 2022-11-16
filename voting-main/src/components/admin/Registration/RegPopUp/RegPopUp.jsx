import React from "react";
import {Modal} from 'antd';
import "./RegPopUp.css";

const RegPopUp = (props) => {
    let isVisible = props.isVisible;
    const handleCancel = props.handleCancel;

    return <div className="Modal_window_reg">
        <Modal title="Результаты регистрации:" 
        visible={isVisible} onCancel={handleCancel} footer={null}>
            <div className='title_text'>Регистрация проведена успешно</div>
       </Modal>
    </div>
}

export default RegPopUp;