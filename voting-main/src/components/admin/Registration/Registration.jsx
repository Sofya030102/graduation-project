import { Component } from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { registration } from '../../../contract/helper';
import Spinner from '../../Spinner/index';
import "./style.css";
import RegPopUp from './RegPopUp/RegPopUp';


const schema = Yup.object().shape({
  email: Yup.string()
    .required()
    .min(3),
});


class RegistrationFromAdmin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spin: false,
      isVisibleNewReg: false,
    }
  }


  openPopup = () => {
    this.setState({ isVisibleNewReg: true });
  }

  cancelPopup = () => {
    this.setState({ isVisibleNewReg: false });
  }

  onSubmit = async (values) => {
    this.setState({spin: true});
    const { email, FIO, password } = values;
    const isreg = await registration(email, FIO, password);
    this.setState({spin: false});
    if (isreg === true) this.setState({isVisibleNewReg: true});
    else message.error(isreg);
  }

  render() {
    const { spin, isVisibleNewReg } = this.state;
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
              Зарегистрировать
            </Button>
            {errors.email && <div>{errors.email}</div>}
          </div>
          {spin && <Spinner />}
          <RegPopUp isVisible={isVisibleNewReg} handleCancel={this.cancelPopup}/>
          </Form>
        )}
      />
    );
  }
}

export default RegistrationFromAdmin;