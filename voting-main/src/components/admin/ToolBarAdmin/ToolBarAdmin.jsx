import React from "react";
import {Button} from "antd";
import "./ToolBarAdmin.css";

const ToolBarAdmin = (props) => {

    return <div className="ToolBarAdmin">
        <Button type="primary" className="ToolBarButtonAdmin" 
        onClick={() => props.openScreen("chg_role")}>Смена роли пользователя</Button>
        <Button type="primary" className="ToolBarButtonAdmin" 
        onClick={() => props.openScreen("set_EC")}>Назначение члена ИК</Button>
        <Button type="primary" className="ToolBarButtonAdmin" 
        onClick={() => props.openScreen("set_audit")}>Назначение аудитора</Button>
        <Button type="primary" className="ToolBarButtonAdmin" 
        onClick={() => props.openScreen("reg")}>Регистрация пользователя</Button>
        <Button type="primary" className="ToolBarButtonAdmin" 
        onClick={() => props.openScreen("rec_key")}>Восстановление ключей</Button>
    </div>
}

export default ToolBarAdmin;