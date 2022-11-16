import React from "react";
import {Modal} from 'antd';
import "./StatusModal.css";

const StatusModal = (props) => {
    let isError = props.isError;
    let isVisible = props.isVisible;
    const handleCancel = props.handleCancel;
    const callFrom = props.callFrom;
    let Title_window;
    let title_modal;

    switch(callFrom){
        case 'Set_auditor':
            title_modal = "Результаты изменения аудитора:";
            if (!isError) Title_window = <div className='title_text'>Аудитор успешно изменён</div>;
            break;
        case 'Set_EC':
            title_modal = "Результаты изменения члена избирательной комиссии:";
            if (!isError) Title_window = <div className='title_text'>Член избирательной комиссии успешно изменён</div>;
            break;
        case 'Change_user_role':
            title_modal = "Результаты изменения роли пользователя";
            if (!isError) Title_window = <div className='title_text'>Роль пользователя успешно изменена</div>;
            break;
        default:
            break;
    }

    if (isError) Title_window = <div className='title_text'>Произошла ошибка, повторите попытку</div>;

    return <div className="Modal_window_status">
        <Modal title={title_modal}
        visible={isVisible} onCancel={handleCancel} footer={null}>
            {Title_window}
       </Modal>
    </div>
}

export default StatusModal;