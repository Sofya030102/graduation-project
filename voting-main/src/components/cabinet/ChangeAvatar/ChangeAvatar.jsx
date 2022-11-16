import React from 'react';
import {Modal, Button} from 'antd';
import {Change_avatar} from "../../../contract/helper";
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './ChangeAvatar.module.css';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class ChangeAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            confirmLoading: false,
            loading: false,
        };
    }

    setConfirmLoading = (confirmLoading) => {
        this.setState({ confirmLoading: confirmLoading });
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            if (this.state.filename != '') this.deletePhoto(this.state.filename);
            console.log(info.file.xhr.response);
            this.setState({filename: info.file.xhr.response})
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    deletePhoto = async (name_to_delete) => {
        await fetch("http://localhost:3001/delete", {
            method: 'POST',
            body: JSON.stringify({name: name_to_delete}),
            headers: {
                'Content-Type': 'application/json'
            }})
    }

    sendPhoto = async () => {
        this.setConfirmLoading(true);
        if (this.state.filename !== '') {
            let isChanged = await Change_avatar(this.state.filename);
            if (isChanged === true) {
                message.success("Аватар успешно изменён!");
                this.setConfirmLoading(false);
                this.props.handleCancel();
            } else message.error(isChanged.message);
        }
        else message.error('Вы не выбрали файл для аватарки!')
        this.setConfirmLoading(false);
    }

    render() {
        const {confirmLoading, loading, imageUrl} = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div style={{marginTop: 8}}>Загрузить</div>
            </div>
        );
        let isVisible = this.props.isVisible;
        let handleCancel = this.props.handleCancel;
        let title = 'Изменение аватара';
        console.log(this.state.filename);
        return (<Modal title={title} visible={isVisible} confirmLoading={confirmLoading}
                       onOk={this.sendPhoto} onCancel={handleCancel} okText='Отправить фото' cancelText='Отменить'>
            <div className={styles.avatar_updater_base}>
            <Upload
                id='photo_place'
                name="photo"
                listType="picture-card"
                className={styles.avatar_updater}
                showUploadList={false}
                action="http://localhost:3001/upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
            </Upload>
            </div>
        </Modal>)
    }
}

export default ChangeAvatar;