import { Component } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getUserAddress, Auditor_change} from '../../../contract/helper';
import Spinner from '../../Spinner/index';
import "./style.css";
import StatusModal from '../../StatusModal/StatusModal';


const schema = Yup.object().shape({
  email: Yup.string()
    .required()
    .min(3),
});


class Set_auditor extends Component {

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
      let isChanged = await Auditor_change(userKey, address);
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
    const { spin, isVisible, isVisibleError } = this.state;
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
              Назначить аудитором
            </Button>
            {errors.email && <div>{errors.email}</div>}
          </div>
          {spin && <Spinner />}
          <StatusModal isError={isVisibleError} isVisible={isVisible} 
          handleCancel={this.cancelPopup} callFrom='Set_auditor'/>
          </Form>
        )}
      />
    );
  }
}

export default Set_auditor;