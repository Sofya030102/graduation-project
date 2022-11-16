import React from "react";
import {Modal, Input, message} from "antd";
import { Change_name } from "../../../contract/helper";
import "./style.css";

const Edit_name_modal = (props) => {
    let new_fio;
    let isVisible = props.isVisible;
    let handleCancel = props.handleCancel;

    const [confirmLoading, setConfirmLoading] = React.useState(false);
    
    const changeFIO = async (new_fio) => {
        setConfirmLoading(true);
        const address = localStorage.getItem('address');
        if (typeof new_fio !== 'undefined') console.log(new_fio);
        let new_name = await Change_name(address,new_fio);
        if (new_name === true){
            message.success('ФИО успешно изменено!');
            setConfirmLoading(false);
            handleCancel();
        }
        else {
            message.error(new_name.message);
            setConfirmLoading(false);
        }
    }

    return <div className="new-fio-form">
        <Modal title="Новый адрес электронной почты" visible={isVisible} 
        onOk={() => changeFIO(new_fio)} confirmLoading={confirmLoading} onCancel={handleCancel}>
            <div className="edit_modal_old_data_profile">
                <div className='title_text_data_profile_modal'>Ваше старое ФИО :</div>
                <div className="title_old_data_profile_modal">{props.old_fio}</div>
            </div>
            <div className="edit_modal_new_data_profile">
                <div className='title_text_data_profile_modal'>Введите новое ФИО</div>
                <Input value={new_fio} onChange={(e) => { new_fio = e.target.value }}/>
            </div>
       </Modal>
    </div>
}

export default Edit_name_modal;