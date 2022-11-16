import React from 'react';
import {EC_voting } from '../../../contract/helper';
import {Modal, Input, message} from 'antd';
import styles from './KickECVote.module.css';
import { UserOutlined } from '@ant-design/icons';

const KickECVote = (props) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    let [name, setName] = React.useState(0);

    let isVisible = props.isVisible;
    let handleCancel = props.handleCancel;
    let UserFIO = props.name;
    let text_question = 'Запрос вывести члена из ИК : ' + name;
    let title = "Подтверждение запроса на вывод пользователя из ИК";

    const EC_create_vote = async (text_question) => {
        setConfirmLoading(true);
        let isCreated = await EC_voting(text_question);
        if (isCreated === true) message.success('Запрос создан!');
        else message.error(isCreated.message);
        setConfirmLoading(false);
    }

    return <Modal title={title} visible={isVisible} confirmLoading={confirmLoading}
     onOk={() => EC_create_vote(text_question)} onCancel={handleCancel} okText='ОК' cancelText='Отменить'>
        <div className={styles.question}>
            Уважаемый(ая) {UserFIO}
        </div>
        <div className={styles.question}>
            Введите ФИО пользователя, которого Вы хотите вывести из членов избирательной комиссии:
        </div>
        <Input 
          onChange={(e)=> {setName(e.target.value);}} 
          size="large" 
          placeholder="ФИО" 
          prefix={<UserOutlined />}
          className={styles.input_name}
        />
    </Modal>
}   

export default KickECVote;