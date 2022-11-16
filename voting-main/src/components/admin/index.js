import { Component } from "react";
import Spinner from '../Spinner/index';
import './style.css';
import ToolBarAdmin from "./ToolBarAdmin/ToolBarAdmin";
import RegistrationFromAdmin from "./Registration/Registration";
import ChangeUserRole from "./Change_user_role/Change_user_role";
import SetEC from "./Set_EC/Set_EC";
import SetAuditor from "./Set_auditor/Set_auditor";
import RecoveryKey from "./Recovery_key/Recovery_key";

class Admin extends Component {

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
    let current_element;

    switch(currentScreen) {
      case "reg":
        current_element = <RegistrationFromAdmin />;
        break;
      case "chg_role":
        current_element = <ChangeUserRole />;
        break;
      case "set_EC":
        current_element = <SetEC />;
        break;
      case "set_audit":
        current_element = <SetAuditor />;
        break;
      case "rec_key":
        current_element = <RecoveryKey />;
        break;
      default:
        current_element = <ChangeUserRole />;
        break;
    }

    return (
      <div className="admin">
        <ToolBarAdmin openScreen={this.openScreen}/>
        {current_element}
        { spin && <Spinner />} 
      </div>
    );
  }
}

export default Admin;