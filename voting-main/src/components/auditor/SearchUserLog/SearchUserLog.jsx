import { Component } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import { getUser } from '../../../contract/helper';
import Spinner from '../../Spinner/index';
import ModalUserRole from './ModalUserRole/ModalUserRole';
import ModalUserRoleError from './ModalUserRoleError/ModalUserRoleError'

  class search_user_log extends Component {
    constructor(props) {
      super(props);
      this.state = {
        spin: false,
        UserRole: "",
        isVisibleUser: false,
        isVisibleUserError: false,
      }
    }
    onSubmit = async (values) => {
        this.setState({spin: true});
        const {login} = values;
        console.log(login);
        let user = await getUser(login);
        if (user.name.trim() !== '') {  
            let role = user.role;
            console.log(role);
            this.setState({spin: false});
            if (role !== false) {
                this.setState({UserRole: role});
                this.setState({ isVisibleUser: true });
            }
        }
        else this.setState({isVisibleUserError: true, spin: false});
    }

    openPopup = () => {
        this.setState({ isVisibleUser: true });
    }
    
    cancelPopup = () => {
        this.setState({ isVisibleUser: false });
    }
    
    cancelPopupError = () => {
        this.setState({ isVisibleUserError: false });
    }
  
    render() {
      const { spin, UserRole, isVisibleUser, isVisibleUserError } = this.state;
      return (
        <Formik
          isSubmitting 
          initialValues={{
            login: ''
          }}
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
                onChange={(e)=> { setFieldValue('login', e.target.value); }} 
                value={values.login} 
                size="large" 
                placeholder="login" 
                prefix={<UserOutlined />}
                className="registration__login"
              />
              <Button
                type="primary" 
                block
                htmlType="submit"
                className="registration__btn">
                Поиск пользователя по логину
              </Button>
            </div>
            <ModalUserRole isVisible={isVisibleUser} handleCancel={this.cancelPopup} UserRole={UserRole}/>
            <ModalUserRoleError isVisible={isVisibleUserError} handleCancel={this.cancelPopupError}/>
            {spin && <Spinner />}
            </Form>
          )}
        />
      );
    }
  }

export default search_user_log;