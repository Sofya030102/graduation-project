import { Component } from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { authorization, getUserAddress, getUser } from '../../contract/helper';
import Spinner from '../Spinner/index';
import "./style.css";

class Authorization extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      spin: false,
    }
  }

  onSubmit = async () => {
    try {
      this.setState({spin: true});
      const { login, password } = this.state;
      const log_add = await getUserAddress(login);
      const address = await authorization(log_add, password);
      console.log(address);
      if (address) {
        window.localStorage.setItem('address', address);
        let user = await getUser(address);
        let role = user.role;
        let isAuditor = user.auditor;
        let isEC = user.EC;
        window.localStorage.setItem('role', role);
        window.localStorage.setItem('isAuditor', isAuditor);
        window.localStorage.setItem('isEC', isEC);
        window.location.href = '/home';
      }
      this.setState({spin: false});
    }
    catch(e) {
      message.error(e.message);
      console.log(e);
      this.setState({spin:false});
    }
  }

  render() {
    const { login, password, spin } = this.state;

    return (
      <div className="authorization">
        <Input 
          onChange={(e)=> { this.setState({login: e.target.value}); }} 
          value={login} 
          size="large" 
          placeholder="e-mail" 
          prefix={<UserOutlined />}
          className="authorization__login"
        />
        <Input.Password
          onChange={(e)=> { this.setState({password: e.target.value}); }}
          value={password} 
          placeholder="Пароль"
          className="authorization__password"
        />
        <Button 
          onClick={this.onSubmit}
          type="primary"
          block
          className="authorization__btn"
        >
          Авторизоваться
        </Button>
        <Link to="registration">Зарегистрироваться</Link>
        {spin && <Spinner />}
      </div>
    );
  }
}

export default Authorization;