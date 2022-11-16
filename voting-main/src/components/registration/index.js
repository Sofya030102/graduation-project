import { Component } from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { registration } from '../../contract/helper';
import Spinner from '../Spinner/index';
import "./style.css";

const schema = Yup.object().shape({
  email: Yup.string()
    .required()
    .min(3),
});


class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spin: false,
    }
  }

  onSubmit = async (values) => {
    this.setState({spin: true});
    const { email, FIO, password } = values;
    let registered = await registration(email, FIO, password);
    if (registered === true ) window.location.href = './authorization';
    else message.error(registered);
    this.setState({spin: false});
  }

  render() {
    const { spin } = this.state;
    return (
      <Formik
        isSubmitting 
        initialValues={{
          email: '',
          FIO: '',
          password: '',
          againPassword: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          this.onSubmit(values);
        }}
        render={({
          values,
          errors,
          handleSubmit,
          handleChange,
          isSubmitting,
          setFieldValue
        }) => (
          <Form>
          <div className="registration">
            <Input 
              onChange={(e)=> { setFieldValue('email', e.target.value); }} 
              value={values.email} 
              size="large" 
              placeholder="e-mail" 
              prefix={<UserOutlined />}
              className="registration__login"
            />
            <Input 
              onChange={(e)=> { setFieldValue('FIO', e.target.value); }}
              value={values.FIO} 
              placeholder="ФИО"
              className="registration__name"
            />
            <Input.Password
              onChange={(e)=> { setFieldValue('password', e.target.value); }}
              value={values.password} 
              placeholder="Пароль"
              className="registration__password"
            />
            <Button
              type="primary" 
              block
              htmlType="submit"
              className="registration__btn"
            >
              Зарегистрироваться
            </Button>
            <Link to="authorization">Авторизоваться</Link>
            {errors.email && <div>Поле E-Mail не должно быть пустым</div>}
          </div>
          {spin && <Spinner />}
          </Form>
        )}
      />
    );
  }
}

export default Registration;