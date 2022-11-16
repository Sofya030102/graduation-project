import React from "react";
import "./Voting_results.css";
import VotingItem from "./Voting_item/Voting_item";
import { Component } from "react";
import { getVotings, getUser } from '../../contract/helper';

class Voting_results extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          user: {},
          isVisibleNewVoter: false,
          votings: {},
          close_votings: {}
        }
    }
      
    async componentDidMount() {
        this.getUser();
        this.getOpenVotings();
    }
    
    getUser = async () => {
        const address = localStorage.getItem('address');
        console.log(address);
        const user = await getUser(address);
        console.log(user);
        this.setState({ user });
    }
    
    getOpenVotings = async () => {
        let votings;
        if (this.state.user.role != "ACUU") votings = await getVotings(true,false, true, true);
        else votings = await getVotings(true,true,true,false);
        this.setState({votings: votings});
    }

    getCloseVotings = async () => {
        let votings;
        if (this.state.user.role != "ACUU") votings = await getVotings(false,false, true, true);
        else votings = {};
        this.setState({close_votings: votings});
    }

    render() {
        let {questions_list, id_list} = this.state.votings;
        let voting_items, close_voting_items, isAdmin;
        if (this.state.user.role != "ACUU") isAdmin = false;
        else isAdmin = true;
        if (id_list === undefined) voting_items = <div>Голосования отсутствуют</div>
        else voting_items = id_list.map((val, index) => {
            if(questions_list[index] != '') {
                return <VotingItem name_voting={questions_list[index]} id={val} isAdmin={isAdmin}/>
            }
        })
        if(this.state.close_votings.id_list != undefined) {
            close_voting_items = this.state.close_votings.id_list.map((val, index) => {
                if(this.state.close_votings.questions_list[index] != '') {
                    return <VotingItem name_voting={this.state.close_votings.questions_list[index]} id={val} isAdmin={isAdmin}/>
                }
            })
        }
        else close_voting_items="";

        return <div className = "Voiting_result">
            {voting_items}
            {close_voting_items}
        </div> 
    }
}
 
export default Voting_results;