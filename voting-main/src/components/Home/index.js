import { Component } from 'react';
import { Button } from 'antd';
import NewVoter from '../NewVoter';
import "./style.css";
import Voting from './Votings/voting';
import { getVotings, getUser } from '../../contract/helper';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isVisibleNewVoter: false,
      votings: {},
      ec_votings: {},
      close_votings: {},
      role: '',
      currentVotings: 'open'
    }
  }
  
  async componentDidMount() {
    await this.getUser();
    await this.getVotingsToVote();
    await this.getCloseVotingsToVote();
    await this.getECVotingsToVote();
  }

  getUser = async () => {
    const address = localStorage.getItem('address');
    console.log(address);
    const user = await getUser(address);
    console.log(user);
    const role = user.role;
    this.setState({ user, role });
  }

  getVotingsToVote = async () => {
    let votings = await getVotings(true,false, false, false);
    this.setState({votings: votings});
  }

  getCloseVotingsToVote = async () => {
    let close_votings = await getVotings(false,false, false, false);
    this.setState({close_votings: close_votings});
  }

  getECVotingsToVote = async () => {
    let ec_votings = await getVotings(true,true, false, false);
    console.log('get_ec_vote correct');
    console.log(ec_votings);
    this.setState({ec_votings: ec_votings});
  }

  openPopup = () => {
    this.setState({ isVisibleNewVoter: true });
  }

  cancelPopup = () => {
    this.setState({ isVisibleNewVoter: false });
    this.componentDidMount();
  }

  render() {
    let { isVisibleNewVoter, user, votings, ec_votings, close_votings, currentVotings } = this.state;
    
    let {questions_list, id_list} = votings;
    let ec_questions_list = ec_votings.questions_list;
    let ec_id_list = ec_votings.id_list;
    let close_votings_questions_list = close_votings.questions_list;
    let close_votings_id_list = close_votings.id_list;

    let left_panel;
    let voting_items;
    let isEmptyEC = true;
    let isEmptyOpen = true;
    let isEmptyClose = true;
    if(user.role !== 'ACUU') {
      if (currentVotings === 'open') {
        console.log('QUESTION ARE:' + questions_list);
        console.log('ID LIST ARE:' + id_list);
        if (id_list === undefined) voting_items = <div>Голосования отсутствуют</div>
        else voting_items = id_list.map((val, index) => {
          if (questions_list[index] !== '') {
            isEmptyOpen = false;
            return <Voting question={questions_list[index]} id={val} isEC={false}/>
          }
        })
        if (isEmptyOpen) voting_items = <div>Голосования отсутствуют</div>
      } else if (currentVotings === 'EC') {
        console.log('EC QUESTION ARE:' + ec_questions_list);
        console.log('EC ID LIST ARE:' + ec_id_list);
        if (ec_id_list === undefined) voting_items = <div>Голосования отсутствуют</div>
        else voting_items = ec_id_list.map((val, index) => {
          if (ec_questions_list[index] !== '') {
            isEmptyEC = false;
            return <Voting question={ec_questions_list[index]} id={val} isEC={true}/>
          }
        })
        if (isEmptyEC) voting_items = <div>Голосования отсутствуют</div>
      } else if (currentVotings === 'close') {
        console.log('CLOSE QUESTION ARE:' + close_votings_questions_list);
        console.log('CLOSE ID LIST ARE:' + close_votings_id_list);
        if (close_votings_id_list === undefined) voting_items = <div>Голосования отсутствуют</div>
        else voting_items = close_votings_id_list.map((val, index) => {
          if (close_votings_questions_list[index] !== '') {
            isEmptyClose = false;
            return <Voting question={close_votings_questions_list[index]} id={val} isEC={false}/>
          }
        })
        if (isEmptyClose) voting_items = <div>Голосования отсутствуют</div>
      }
    }
    else voting_items = <div>Голосования отсутствуют</div>;
      let button_open_votings, button_ec_votings, button_close_votings;
      if (user.EC === true) left_panel =
          <Button type="primary" onClick={this.openPopup} className='left_panel_items'>Новое голосование</Button>;
      button_open_votings =
          <Button type="primary" style={{fontSize: 'small'}} onClick={() => this.setState({currentVotings: 'open'})}
                  className='left_panel_items'>Открытые голосования</Button>;
      button_ec_votings =
          <Button type="primary" style={{fontSize: 'small'}} onClick={() => this.setState({currentVotings: 'EC'})}
                  className='left_panel_items'>Голосования за членов ИК</Button>
      button_close_votings =
          <Button type="primary" style={{fontSize: 'small'}} onClick={() => this.setState({currentVotings: 'close'})}
                  className='left_panel_items'>Закрытые голосования</Button>
      if (voting_items.length == 0) voting_items = <div>Голосования отсутствуют</div>;
    return (
      <div className="home">
        <div className='admin_panel'>{left_panel}{button_open_votings}
          {button_ec_votings}{button_close_votings}</div>
        <NewVoter isVisible={isVisibleNewVoter} handleCancel={this.cancelPopup}/>
        <div className='voting_items'>
          {voting_items}
        </div>
      </div>
    );
  }
}

export default Home;