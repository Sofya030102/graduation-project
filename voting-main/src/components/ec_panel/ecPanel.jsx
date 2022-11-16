import { Component } from "react";
import Spinner from '../Spinner/index';
import styles from './ecPanel.module.css';
import EcToolbar from "./ecToolbar/ecToolbar";
import RecoveryKey from "./../admin/Recovery_key/Recovery_key";
import CheckLegitVote from "./../auditor/CheckLegitVote/CheckLegitVote";

class ecPanel extends Component {

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
      <div className={styles.ecPanel}>
        <EcToolbar openScreen={this.openScreen}/>
        {currentScreen === "recovery_key" && <RecoveryKey />}
        {currentScreen === "check_count_vote" && <CheckLegitVote />}
        { spin && <Spinner />} 
      </div>
    );
  }
}

export default ecPanel;