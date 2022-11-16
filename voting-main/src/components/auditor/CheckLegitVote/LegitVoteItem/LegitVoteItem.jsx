import {Component} from "react";
import {Button, message} from "antd";
import styles from './LegitVoteItem.module.css'
import ModalVote from "./ModalVote/ModalVote";
import {Get_voting_info, delete_Voting} from '../../../../contract/helper';

class LegitVoteItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            isDeleting: false,
            isModal: false,
            results: {}
        }
    }

    setDeletingStatus = (status) => {
        this.setState({isDeleting: status});
    }

    async componentDidMount() {
        await this.getVotingInfo();
    }

    getVotingInfo = async () => {
        let results = await Get_voting_info(this.props.id);
        this.setState({results: results});
    }

    deleteVoting = async (id) => {
        this.setDeletingStatus(true);
        let isDeleted = await delete_Voting(id);
        if (isDeleted === true) message.success("Голосование успешно удалено");
        else message.error(isDeleted.message);
        this.setDeletingStatus(false);
        this.componentDidMount();
    }

    openPopup = () => {
        this.setState({isModal: true})
    }

    closePopup = () => {
        this.setState({isModal: false});
    }

    render(){
        let props = this.props;
        let {isModal} = this.state;
        return <div className={styles.voteItem}>
            <div className={styles.question}> {props.question}</div>
            <ModalVote visible={isModal} cancel={() => this.closePopup()} results={this.state.results}
                question={props.question} countYes={this.state.results[1]} countNo={this.state.results[2]}
            id={this.props.id}/>
            <Button type="primary" className={styles.commit_button} loading={this.state.isDeleting}
                    onClick={()=>this.deleteVoting(this.props.id)}>Удаление голосования</Button>
            <Button type="primary" className={styles.commit_button}
                onClick={()=>this.openPopup()}>Проверка легитимности</Button>
        </div>
    };
}

export default LegitVoteItem;