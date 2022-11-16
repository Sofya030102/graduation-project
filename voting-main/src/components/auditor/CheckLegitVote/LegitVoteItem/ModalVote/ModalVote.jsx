import React from "react";
import styles from "./ModalVote.module.css";
import {Modal, Button, message} from "antd";
import {commit_Voting} from "../../../../../contract/helper";

let ModalVote = (props) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    let title_modal = 'Проверка легитимности голосования';
    let isVisible = props.visible;
    let handleCancel = props.cancel;
    let handleOk = async (id) => {
        setConfirmLoading(true);
        let isCommited = await commit_Voting(id);
        if (isCommited === true)  message.success("Голосование успешно подтверждено");
        else message.error(isCommited.message);
        setConfirmLoading(false);
    }
    let question = props.question;
    let countYes = props.countYes;
    let countNo = props.countNo;
    let results = props.results;
    let voters_type, voters_items;
    const voters = results[3];

    if (voters != undefined) voters_items = voters.map((val) => {
        if(val != '0x0000000000000000000000000000000000000000') return <div className={styles.answers}>{val}</div>
    });

    if (results[0] == 'Students and aspirants') voters_type = 'Студенты и Аспиранты';
    else if (results[0] == 'PPS') voters_type = 'Преподаватели';
    else voters_type = 'Не определено'

    return <div className={styles.modalVote}>
        <Modal title={title_modal}
        visible={isVisible} onCancel={handleCancel} 
        footer={[
            <Button key="back" onClick={handleCancel}>Отменить</Button>,
            <Button key="submit" type="primary" loading={confirmLoading} onClick={() => handleOk(props.id)}>Подтвердить</Button>
        ]}>
            <div className={styles.title_text}>Тема голосования: {question}</div>
            <div className={styles.answers}>Роли участников голосования : {voters_type}</div>
            <div className={styles.answers}>Количество ответов "да" : {countYes}</div>
            <div className={styles.answers}>Количество ответов "нет" : {countNo}</div>
            <div className={styles.answers}>Проголосовавшие : {voters_items}</div>
       </Modal>
    </div>
}

export default ModalVote;
