import { Component } from "react";
import logo from '../../static/logo.png';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 'cabinet',
      role: 0,
      isAuditor: false,
      isEC: false
    }
  }

  setCurrent = (current) => {
    this.setState({ current });
  }

  logout = () => {
    window.localStorage.setItem('address', '');
    window.location.href = 'authorization';
  }

  render() {

    const role = window.localStorage.getItem('role');
    let isAuditor = window.localStorage.getItem('isAuditor');
    const isEC = window.localStorage.getItem('isEC');
    console.log(role);

    return (
      <div className="header">
        <Link to="/home"><div className="header__logo">
          <img className="header__logo_img" src={ logo } alt=""></img>
            Голосование
        </div>
        </Link>
        <div className="header__menu">
          <Link className="header__link" to="/cabinet">Личный кабинет</Link>
          <Link className="header__link" to="/vote_results">Результаты голосований</Link>
          {role === 'ACUU' && <Link className="header__link" to="/admin">Админ панель</Link>}
          {isAuditor === 'true' && <Link className="header__link" to="/auditor">Панель аудитора</Link>}
          {isEC === 'true' && <Link className="header__link" to="/ecPanel">Панель комиссии</Link>}
        </div>
        <Button onClick={this.logout} type="dashed" icon={<LoginOutlined />} size="large">
          Выйти
        </Button>
      </div>
    );
  }
}

export default Header;