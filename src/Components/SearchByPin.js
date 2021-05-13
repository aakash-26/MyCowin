import React, { Component } from "react";
import {
  Form,
  Card,
  Row,
  Col,
  Input,
  Button,
  Divider,
  notification,
  Switch,
  Select,
  Tooltip,
  message,
} from "antd";
import "../App.css";
import { SearchOutlined } from "@ant-design/icons";
export default class SerchByPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validPin: false,
    };
    this.callSetPin = this.callSetPin.bind(this);
    this.pinValidation = this.pinValidation.bind(this);
    this.callfindSession = this.callfindSession.bind(this);
  }
  callSetPin(e) {
    this.props.setpin(e.target.value);
  }
  callfindSession() {
    if (this.state.validPin) {
      this.props.findsession();
    }
  }
  pinValidation(e) {
    console.log("pin", e.target.value);
    var pattern = /^\d{6}$/;
    if (!pattern.test(e.target.value)) {
      notification.error({
        message: "Invalid pin code",
        description: "Please enter valid pin code",
      });
      this.setState({ validPin: false });

    } else {
      this.setState({ validPin: true });
    }
  }
  render() {
    return (
      <Row>
        <Col span={24}>
          <Form>
            <Row style={{ paddingLeft: "4%" }}>
              <Col span={20}>
                <Form.Item
                  name="pin"
                  rules={[{ required: true, message: "Please Enter Pin" }]}
                >
                  <Input
                    style={{ width: "108%", textAlign: "center" }}
                    onChange={this.callSetPin}
                    onBlur={this.pinValidation}
                    placeholder="Enter your pin"
                  />
                </Form.Item>
              </Col>
              <Col style={{ paddingLeft: "9%" }}>
                <Form.Item>
                  <Tooltip title="search">
                    <Button
                      size="large"
                      type="primary"
                      shape="circle"
                      onClick={this.callfindSession}
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}
