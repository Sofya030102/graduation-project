import { Component } from "react";
import Spinner from '../Spinner/index';
import './style.css';
import ToolBarAuditor from "./ToolBarAuditor/ToolBarAuditor";
import SearchUserLog from "./SearchUserLog/SearchUserLog";
import RecoveryKey from "./../admin/Recovery_key/Recovery_key";
import CheckLegitVote from "./CheckLegitVote/CheckLegitVote";

class Auditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spin: false,
      currentScreen: "false",
    }
  }

  async componentDidMount() {
  }

  openScreen = (name_screen) => {
    this.setState({ currentScreen: name_screen });
  }

  render() {
    const { currentScreen, spin } = this.state;
    console.log(currentScreen);

    return (
      <div className="auditor">
        <ToolBarAuditor openScreen={this.openScreen}/>
        {currentScreen === "recovery_key" && <RecoveryKey />}
        {currentScreen === "check_legit_vote" && <CheckLegitVote />}
        {currentScreen === "search_user_log" && <SearchUserLog />}
        { spin && <Spinner />} 
      </div>
    );
  }
}

export default Auditor;