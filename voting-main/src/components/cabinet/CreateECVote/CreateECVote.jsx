import React from 'react';
import {EC_voting } from '../../../contract/helper';
import {Modal, message} from 'antd';
import styles from './CreateECVote.module.css';

const CreateECVote = (props) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    let isVisible = props.isVisible;
    let handleCancel = props.handleCancel;
    let UserFIO = props.name;
    let text_question = 'Запрос стать членом ИК от: ' + UserFIO;
    let title = "Подтверждение запроса стать членом ИК";

    const EC_create_vote = async (text_question) => {
        setConfirmLoading(true);
        let isCreated = await EC_voting(text_question);
        if (isCreated === true) message.success('Запрос создан!');
        else message.error(isCreated.message);
        setConfirmLoading(false);
    }

    return <Modal title={title} visible={isVisible} confirmLoading={confirmLoading}
     onOk={() => EC_create_vote(text_question)} onCancel={handleCancel} okText='Да' cancelText='Нет'>
        <div className={styles.question}>
            Уважаемый(ая) {UserFIO}
        </div>
        <div className={styles.question}>
            Вы действительно хотите подать запрос на членство в избирательной комиссии?
        </div>
    </Modal>
}   

export default CreateECVote;