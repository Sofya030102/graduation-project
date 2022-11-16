import React from "react";
import {Modal, Input, message} from "antd";
import {Change_email} from "../../../contract/helper"
import "./style.css";

const Edit_email_modal = (props) => {
    let isVisible = props.isVisible;
    let handleCancel = props.handleCancel;
    let new_email;

    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const changeEmail = async (new_email) => {
        setConfirmLoading(true);
        const address = localStorage.getItem('address');
        if (typeof new_email !== 'undefined') console.log(new_email);
        let new__email = await Change_email(address,new_email);
        if (new__email === true){
            message.success('E-Mail адрес успешно изменён');
            setConfirmLoading(false);
            handleCancel();
        }
        else {
            message.error(new__email.message);
            setConfirmLoading(false);
        }
    }

    return <div className="new-email-form">
        <Modal title="Новый адрес электронной почты" visible={isVisible} confirmLoading={confirmLoading}
        onOk={() => changeEmail(new_email)} onCancel={handleCancel}>
            <div className="edit_modal_old_data_profile">
                <div className='title_text_data_profile_modal'>Ваш старый адрес электронной почты :</div>
                <div className="title_old_data_profile_modal">{props.old_email}</div>
            </div>
            <div className="edit_modal_new_data_profile">
                <div className='title_text_data_profile_modal'>Введите новый e-mail</div>
                <Input value={new_email} onChange={(e) => { new_email = e.target.value}}/>
            </div>
       </Modal>
    </div>
}

export default Edit_email_modal;