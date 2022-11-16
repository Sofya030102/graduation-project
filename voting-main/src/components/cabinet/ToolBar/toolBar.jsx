import React from "react";
import {Button} from "antd";
import "./ToolBar.css";

const ToolBar = (props) => {
    const openPopup = props.openFunction;
    const isEC = props.isEC;
    return <div className="ToolBar">
        <Button type="primary" className="ToolBarButton" onClick={() => openPopup('Edit_email_modal')}>Редактировать E-Mail</Button>
        <Button type="primary" className="ToolBarButton" onClick={() => openPopup('Edit_name_modal')}>Редактировать ФИО</Button>
        <Button type="primary" className="ToolBarButton" onClick={() => openPopup('Edit_avatar_modal')}>Изменить аватар</Button>
        <Button type="primary" className="ToolBarButton" onClick={() => openPopup('Create_EC_Vote')}>Запрос стать членом ИК</Button>
        {isEC === true && <Button type="primary" className="ToolBarButton" onClick={() => openPopup('Kick_EC_Vote')}>Запрос вывести члена ИК</Button>}
    </div>
}

export default ToolBar;