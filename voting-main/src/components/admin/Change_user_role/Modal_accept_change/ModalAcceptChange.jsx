import {Modal, Button} from 'antd';
import styles from "./ModalAcceptChange.module.css";
import StatusModal from "./../../../StatusModal/StatusModal";
import { getUserAddress, Role_change } from '../../../../contract/helper';
import { Component } from "react";
import React from 'react';

class ModalAcceptChange extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isVisible: false,
          isVisibleError: false,
          confirmLoading: false
        }
    }

    handleOK = async (email, handleCancel) => {
        this.setState({confirmLoading: true});
        let userKey = await getUserAddress(email);
        console.log(userKey);
        if (userKey !== false) {
          const address = localStorage.getItem('address');
          let isChanged = await Role_change(userKey, address);
          if (isChanged) this.setState({isVisible: true});
          else this.setState({isVisible: true,isVisibleError: true});
        }
        else this.setState({isVisible: true,isVisibleError: true});
        handleCancel();
        this.setState({confirmLoading: false});
    }

    cancelPopup = () => {
        this.setState({ isVisible: false });
    }

    render() {
        const { isvisible, isVisibleError, confirmLoading } = this.state;
        let props = this.props;
        let isVisible = props.isVisible;
        const handleCancel = props.handleCancel;
        const email = props.email;
        const role = props.role;
        let current_role_name;
        let new_role;
        
        if (role === 'Student'){
            current_role_name = 'Студент';
            new_role = 'Аспирант';
        } else if (role === 'Aspirant') {
            current_role_name = 'Аспирант';
            new_role = 'Преподаватель не в учёном совете'
        } else if (role === 'PPSV') {
            current_role_name = 'Преподаватель в учёном совете';
            new_role = 'Преподаватель не в учёном совете'
        } else if (role === 'PPSNV') {
            current_role_name = 'Преподаватель не в учёном совете';
            new_role = 'Преподаватель в учёном совете';
        } else if (role === 'ACUU') {
            current_role_name = 'Администратор';
            new_role = current_role_name;
        }

        return (
            <div className={styles.ModalMain}>
                <Modal title={"Смена роли пользователя:"}
                visible={isVisible} onCancel={handleCancel} confirmLoading={confirmLoading} 
                onOk={() => this.handleOK(email, handleCancel)} cancelText='Отменить' okText='Применить'>
                    <div className={styles.title_text}>{'Текущая роль пользователя: ' + current_role_name}</div>
                    <div className={styles.title_text}>{'Новая роль пользователя: ' + new_role}</div>
                    <div className={styles.title_text}>{'Вы подтверждаете смену роли пользователя?'}</div>
                </Modal>
                <StatusModal isError={this.state.isVisibleError} isVisible={this.state.isVisible} 
                    handleCancel={this.cancelPopup} callFrom='Change_user_role'/>
            </div>
        );
    }    
}

export default ModalAcceptChange;