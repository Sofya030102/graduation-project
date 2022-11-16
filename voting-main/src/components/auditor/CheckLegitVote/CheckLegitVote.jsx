import LegitVoteItem from "./LegitVoteItem/LegitVoteItem";
import { Component } from 'react';
import { Button } from 'antd';
import { getVotings, getUser } from '../../../contract/helper';

class check_legit_vote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      votings: {},
    }
  }
  
  async componentDidMount() {
    this.getVotings();
  }

  getVotings = async () => {
    let votings = await getVotings(true,false, true, false);
    console.log(votings);
    this.setState({votings: votings});
  }

  render() {
    let {questions_list, id_list} = this.state.votings;
    let voting_items;
    if (id_list === undefined) voting_items = <div>Голосования отсутствуют</div>
    else voting_items = id_list.map((val, index) => {
      if (questions_list[index] != '') {
        return <LegitVoteItem question={questions_list[index]} id={val}/>
      }
    })

    return (
      <div className="home">
        <div className='voting_items'>
          {voting_items}
        </div>
      </div>
    );
  }
}

export default check_legit_vote;