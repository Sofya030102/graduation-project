import React from "react";
import { Checkbox, Button, message } from 'antd';
import "./voting.css";
import {Vote} from './../../../contract/helper'

const Voting = (props) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  let [YesCheck, setYesCheck] = React.useState(false);
  let [NoCheck, setNoCheck] = React.useState(false); 
  let id = props.id;
  let isEC = props.isEC;

  function onChangeYes(e) {
    setYesCheck(e.target.checked);
    setNoCheck(!(e.target.checked));
    console.log(`YesChecked = ${e.target.checked}`);
  }

  function onChangeNo(e) {
    setNoCheck(e.target.checked);
    setYesCheck(!(e.target.checked));
    console.log(`NoChecked = ${e.target.checked}`);
  }

  const VoteToId = async (YesCheck,NoCheck,VoteId) => {
    setConfirmLoading(true);
    console.log('yescheck= ' + YesCheck + ' nocheck= ' + NoCheck + ' VoteId= ' + VoteId);
    if (YesCheck == NoCheck) message.error('Невозможно проголосовать за два ответа');
    else if (typeof(YesCheck) == undefined || typeof(NoCheck) == undefined) message.error('Сделайте выбор!');
    else if (YesCheck == NoCheck && NoCheck == false) message.error('Сделайте выбор!');
    else {
        if (YesCheck == true) await Vote(VoteId,true);
        else await Vote(VoteId,false);
    }
    setConfirmLoading(false);
  }

  return <div className="voting_css">
      <div className="question">{props.question}</div>
      <div className="checkboxes">
        <Checkbox name='YesCheck' onChange={onChangeYes} checked={YesCheck}><div className="answers">Да</div></Checkbox>
        <Checkbox name='NoCheck' onChange={onChangeNo} checked={NoCheck}><div className="answers">Нет</div></Checkbox><br/>
      </div>
      <Button type="primary" className="vote_button"
      onClick={() => VoteToId(YesCheck,NoCheck,id)} loading={confirmLoading}
      >Проголосовать!</Button>
  </div>
}

export default Voting;