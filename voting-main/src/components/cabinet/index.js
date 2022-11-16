import { Component } from "react";
import { getUser} from "../../contract/helper";
import ToolBar from "./ToolBar/toolBar";
import ProfileData from "./ProfileData/ProfileData";
import './style.css';
import EditNameModal from "./Modal_items/Edit_name_modal";
import EditEmailModal from "./Modal_items/Edit_email_modal";
import CreateECVote from "./CreateECVote/CreateECVote";
import KickECVote from "./KickECVote/KickECVote";
import ChangeAvatar from "./ChangeAvatar/ChangeAvatar";

class Cabinet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isVisibleNewEmail: false,
      isVisibleNewName: false,
      isVisibleNewEC: false,
      isVisibleKickEC: false,
      isVisibleChangeAvatar: false
    };
  }

  async componentDidMount() {
    await this.getUser();
  }

  getUser = async () => {
    const address = localStorage.getItem('address');
    console.log(address);
    let user = await getUser(address);
    this.setState({ user });
  }

  openPopup = (modal_name) => {
    switch(modal_name) {
      case 'Edit_name_modal':
        this.setState({isVisibleNewName: true});
        break;
      case 'Edit_email_modal':
        this.setState({isVisibleNewEmail: true});
        break;
      case 'Create_EC_Vote':
        this.setState({isVisibleNewEC: true});
        break;
      case 'Edit_avatar_modal':
        this.setState({isVisibleChangeAvatar: true});
        break;
      case 'Kick_EC_Vote':
        this.setState({isVisibleKickEC: true});
        break;
      default:
        break;
    }
  }

  cancelPopup = (modal_name) => {
    switch(modal_name) {
      case 'Edit_name_modal':
        this.setState({isVisibleNewName: false});
        break;
      case 'Edit_email_modal':
        this.setState({isVisibleNewEmail: false});
        break;
      case 'Create_EC_Vote':
        this.setState({isVisibleNewEC: false});
        break;
      case 'Edit_avatar_modal':
        this.setState({isVisibleChangeAvatar: false});
        break;
      case 'Kick_EC_Vote':
        this.setState({isVisibleKickEC: false});
        break;
      default:
        break;
    }
    this.componentDidMount();
  }

  render() {
    let { user, isVisibleNewEmail, isVisibleNewName, isVisibleNewEC, isVisibleKickEC, isVisibleChangeAvatar } = this.state;
    console.log(user);

    let { name, login, email, role, EC , auditor, avatar_path } = user;
    console.log(avatar_path);
    return (
      <div className="cabinet">
        <ToolBar openFunction={this.openPopup} isEC={EC}/>
        <ProfileData email={email} login={login} fio={name} role={role} EC={EC} auditor={auditor} avatar={avatar_path}/>
        <EditNameModal isVisible= {isVisibleNewName}
        old_fio= {name} handleCancel={() => this.cancelPopup('Edit_name_modal')} />
        <EditEmailModal isVisible= {isVisibleNewEmail} 
        old_email= {email} handleCancel={() => this.cancelPopup('Edit_email_modal')} />
        <CreateECVote isVisible= {isVisibleNewEC} 
        handleCancel={() => this.cancelPopup('Create_EC_Vote')} name={name}/>
        <KickECVote isVisible= {isVisibleKickEC} 
        handleCancel={() => this.cancelPopup('Kick_EC_Vote')} name={name}/>
        <ChangeAvatar isVisible= {isVisibleChangeAvatar} 
        handleCancel={() => this.cancelPopup('Edit_avatar_modal')} name={name}/>
      </div>
    );
  }
}

export default Cabinet;