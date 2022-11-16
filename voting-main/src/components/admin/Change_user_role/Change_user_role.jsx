import { Component } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getUserAddress, getUser } from '../../../contract/helper';
import ModalAcceptChange from './Modal_accept_change/ModalAcceptChange';
import StatusModal from './../../StatusModal/StatusModal';
import "./style.css";


const schema = Yup.object().shape({
  email: Yup.string()
    .required()
    .min(3),
});


class Change_user_role extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isVisible: false,
      isVisibleError: false,
      isVisibleStatusModal: false,
      email: '',
      role: '',
      address_from: ''
    }
  }

  setLoading = (isLoading) => {
    this.setState({loading: isLoading});
  }

  onSubmit = async (values) => {
    this.setLoading(true);
    const {email} = values;
    let userKey = await getUserAddress(email);
    console.log(userKey);
    if (userKey !== false && userKey !== '0x0000000000000000000000000000000000000000') {
      let user = await getUser(userKey);
      const address = localStorage.getItem('address');
      this.setState({isVisible: true, email: email, role: user.role, address_from: address});
    }
    else this.setState({isVisibleStatusModal: true,isVisibleError: true});
    this.setLoading(false);
  }

  cancelPopup = () => {
    this.setState({ isVisible: false });
  }

  cancelPopupStatus = () => {
    this.setState({ isVisibleStatusModal: false });
  }

  render() {
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
              className="registration__btn"
              loading = {this.state.loading}
            >
              Сменить роль
            </Button>
            {errors.email && <div>{errors.email}</div>}
          </div>
          <ModalAcceptChange  isVisible={this.state.isVisible} handleCancel={this.cancelPopup} 
          email={this.state.email} role={this.state.role}/>
          <StatusModal isError={this.state.isVisibleError} isVisible={this.state.isVisibleStatusModal} 
          handleCancel={this.cancelPopupStatus} callFrom='Change_user_role' />
          </Form>
        )}
      />
    );
  }
}

export default Change_user_role;