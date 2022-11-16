import React from "react";
import {Button} from "antd";
import "./ToolBarAuditor.css";

const ToolBarAuditor = (props) => {

    return <div className="ToolBarAuditor">
        <Button type="primary" className="ToolBarButtonAuditor" 
        onClick={() => props.openScreen("recovery_key")}>Восстановление ключей по e-mail</Button>
        <Button type="primary" className="ToolBarButtonAuditor" 
        onClick={() => props.openScreen("check_legit_vote")}>Проверка легитимности голосования</Button>
        <Button type="primary" className="ToolBarButtonAuditor" 
        onClick={() => props.openScreen("search_user_log")}>Поиск пользователя по логину</Button>
    </div>
}

export default ToolBarAuditor;