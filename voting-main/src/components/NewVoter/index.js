import React from 'react';
import { Component } from 'react';
import { Input, Modal, Switch, message } from 'antd';
import { createVoting } from '../../contract/helper';
import "./style.css";

class NewVoter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisibleNewVoter: false,
      openVoiting: false,
      quastions: '',
      ecVoting : false,
      days: 0,
      confirmLoading: false,
    }
  }
  
  setConfirmLoading = async (current) => {
    this.setState({confirmLoading : current});
  }

  handleOk = async () => {
    const address = localStorage.getItem('address');
    const { openVoiting, quastions, days } = this.state;
    this.setConfirmLoading(true);
    let isCreated = await createVoting(address, quastions, openVoiting, Number(days));
    if (isCreated === true) message.success("Голосование успешно создано!");
    else message.error(isCreated.message);
    this.setConfirmLoading(false);
    }

  render() {
    const { isVisible, handleCancel } = this.props;

    const { ecVoting, openVoiting, quastions, days, confirmLoading } = this.state;

    return (
      <div className="new-voter">
        <Modal title="Новое голосование" visible={isVisible} confirmLoading={confirmLoading}
        onOk={this.handleOk} onCancel={handleCancel}>
          <div className='title_text'>Введите вопросы для голосования</div>
         <Input value={quastions} onChange={(e) => { this.setState({quastions: e.target.value}) }}/>
         <div className='title_text'>Включите тумблер для открытого голосования</div>
         <Switch checked={openVoiting} onChange={() => this.setState({openVoiting: !openVoiting})} />
         <div className='title_text'>Введите количество дней до конца голосования</div>
         <Input
           onChange={(e) => { this.setState({ days: e.target.value }); }}
           placeholder="Input a number"
           maxLength={1}
           value={days}
          />
       </Modal>
      </div>
    );
  }
}

export default NewVoter;