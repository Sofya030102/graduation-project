import React from "react"
import {Component} from "react"
import "./../Voting_results.css"
import {Button} from "antd";
import Okno from "./../okno/okno.jsx";
import { Get_voting_results, EC_check } from "../../../contract/helper";

class Voting_item extends Component{

    constructor(props) {
        super(props);
        this.state = {
          isVisibleNewVoter: false,
          results: {},
          isNeed: false,
        };
    }

    async componentDidMount() {
      this.getVotingResults();
    }

    openPopup = () => {
      this.setState({ isVisibleNewVoter: true });
    }
    
    cancelPopup = () => {
      this.setState({ isVisibleNewVoter: false });
    }

    getVotingResults = async () => {
      let results = await Get_voting_results(this.props.id);
      let isneed;
      if (this.props.isAdmin == true) isneed = await EC_check(this.props.id);
      this.setState({results: results, isNeed: isneed});
    }

    render() {
    const { isVisibleNewVoter, results, isNeed} = this.state;
    const name_voting = " \" " + this.props.name_voting + " \" ";

    return <div className="Voting_item">
        <div className="ramka">{name_voting}</div>
        <Okno name_voting={results[0]} isVisible={isVisibleNewVoter} 
        handleCancel={this.cancelPopup} y_count = {results[1]} n_count={results[2]}
              isNeed={isNeed} isAdmin={this.props.isAdmin}/>
        <Button type="primary" className="knopka" onClick={this.openPopup}>Итог</Button>
    </div>
    }
}

export default Voting_item;