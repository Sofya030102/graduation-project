import React from "react";
import {Button} from "antd";
import styles from "./ecToolbar.module.css";

const ecToolbar = (props) => {

    return <div className={styles.ToolBar}>
        <Button type="primary" className={styles.ToolBarButton} 
        onClick={() => props.openScreen("recovery_key")}>Восстановление ключей по e-mail</Button>
        <Button type="primary" className={styles.ToolBarButton} 
        onClick={() => props.openScreen("check_count_vote")}>Подтверждение подсчёта голосования</Button>
    </div>
}

export default ecToolbar;