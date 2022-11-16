import { Component } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getUserAddress, EC_change } from '../../../contract/helper';
import Spinner from '../../Spinner/index';
import StatusModal from '../../StatusModal/StatusModal';
import "./style.css";


const schema = Yup.object().shape({
  email: Yup.string()
    .required()
    .min(3),
});


class Set_EC extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spin: false,
      isVisible: false,
      isVisibleError: false,
    }
  }

  onSubmit = async (values) => {
    this.setState({spin: true});
    const {email} = values;
    let userKey = await getUserAddress(email);
    console.log(userKey);
    if (userKey !== false) {
      const address = localStorage.getItem('address');
      let isChanged = await EC_change(userKey, address);
      if (isChanged) this.setState({isVisible: true});
      else this.setState({isVisible: true,isVisibleError: true});
    }
    else this.setState({isVisible: true,isVisibleError: true});
    this.setState({spin: false});
  }

  cancelPopup = () => {
    this.setState({ isVisible: false });
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
            <Button
              type="primary" 
              block
              htmlType="submit"
              className="SetEC__btn"
            >
              Добавить в избирательную комиссию
            </Button>
            {errors.email && <div>{errors.email}</div>}
          </div>
          {spin && <Spinner />}
          <StatusModal isError={this.state.isVisibleError} isVisible={this.state.isVisible} 
          handleCancel={this.cancelPopup} callFrom='Set_EC'/>
          </Form>
        )}
      />
    );
  }
}

export default Set_EC;