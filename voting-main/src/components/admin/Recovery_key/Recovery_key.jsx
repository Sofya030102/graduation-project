import { Component } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import RecKeyPopUp from "./RecKeyPopUp/RecKeyPopUp.jsx"
import ErrRecKeyPopUp from "./ErrRecKeyPopUp/ErrRecKeyPopUp.jsx"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getUserAddress} from '../../../contract/helper';
import Spinner from '../../Spinner/index';
import "./style.css";


const schema = Yup.object().shape({
  email: Yup.string()
    .required()
    .min(3),
});


class Recovery_key extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spin: false,
      Reckey: "",
      isVisibleNewKey: false,
      isVisibleNewKeyError: false,
    }
  }

  onSubmit = async (values) => {
    this.setState({spin: true});
    const {email} = values;
    let userKey = await getUserAddress(email);
    console.log(userKey);
    this.setState({spin: false});
    if (userKey !== false) {
      this.setState({Reckey: userKey});
      this.setState({ isVisibleNewKey: true });
    }
    else this.setState({isVisibleNewKeyError: true});
  }

  openPopup = () => {
    this.setState({ isVisibleNewKey: true });
  }

  cancelPopup = () => {
    this.setState({ isVisibleNewKey: false });
  }

  cancelPopupError = () => {
    this.setState({ isVisibleNewKeyError: false });
  }

  render() {
    const { spin, Reckey, isVisibleNewKey, isVisibleNewKeyError } = this.state;
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
            >
              Восстановить ключ
            </Button>
            {errors.email && <div>{errors.email}</div>}
          </div>
          <RecKeyPopUp isVisible={isVisibleNewKey} handleCancel={this.cancelPopup} Reckey={Reckey}/>
          <ErrRecKeyPopUp isVisible={isVisibleNewKeyError} handleCancel={this.cancelPopupError}/>
          {spin && <Spinner />}
          </Form>
        )}
      />
    );
  }
}

export default Recovery_key;