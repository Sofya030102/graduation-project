import React from "react";
import {Modal} from 'antd';
import "./okno.css";

const Okno = (props) => {
    let isVisible = props.isVisible;
    const handleCancel = props.handleCancel;
    let isAdmin = props.isAdmin;

    let need_text = "";
    if (props.isNeed == true) need_text = "Необходимо удовлетворить запрос";
    else need_text = "Запрос не нуждается в удовлетворении";

    return <div className="Modal_window">
        <Modal title="Результаты голосования:" 
        visible={isVisible} onCancel={handleCancel} footer={null}>

          <div className='title_text'>{props.name_voting}</div>
            {isAdmin == false && <div className="answers">Количество ответов "да" : {props.y_count}</div>}
            {isAdmin == false && <div className="answers">Количество ответов "нет" : {props.n_count}</div>}
            {isAdmin == true && <div className="answers">{need_text}</div>}
        </Modal>
    </div>
}

export default Okno;