import { Component } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import './style.css';

const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

class Spinner extends Component {

  render() {
    return (
     <div className="spinner">
      <Spin indicator={antIcon} className="spinner__spin" size="large" />
     </div>
    );
  }
}

export default Spinner;