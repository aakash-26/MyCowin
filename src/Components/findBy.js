import React from "react";
import Session from "./Session";
import SearchByPin from "./SearchByPin";
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
} from "antd";
import "../App.css";
import { SearchOutlined } from "@ant-design/icons";
const BASE_URL = "https://cdn-api.co-vin.in/api";

const { Option } = Select;

const style = {};
const searcByPin = (
  <Row>
    <Form>
      <Col span={24}>
        <Row style={{ paddingLeft: "2%" }}>
          <Col span={22}>
            <Form.Item
              name="pin"
              rules={[{ required: true, message: "Please Enter Pin" }]}
            >
              <Input placeholder="Enter your pin" />
            </Form.Item>
          </Col>
          <Col style={{ paddingLeft: "2%" }}>
            <Form.Item>
              <Tooltip title="search">
                <Button
                  size="large"
                  type="primary"
                  shape="circle"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                />
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Form>
  </Row>
);
export default class findBy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: true,
      pin: "",
      state: "",
      district: "",
      color: "white",
      color2: "black",
      states: [],
      districts: [],
      available_session: [],
      is_available: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.onSelectState = this.onSelectState.bind(this);
    this.setDistrict = this.setDistrict.bind(this);
    this.getSession = this.getSession.bind(this);
    this.setPin = this.setPin.bind(this);
    this.findSessions = this.findSessions.bind(this);
  }

  handleChangeColor() {
    if (this.state.checked) {
      this.setState({ color: "black", color2: "white" });
    } else {
      this.setState({ color: "white", color2: "black" });
    }
  }

  setDistrict(e) {
    this.setState({ district: e });
  }
  setPin(pincode) {
    this.setState({ pin: pincode });
  }
  getSession() {
    console.log("aaa", this.state.district);
    var url =
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?" +
      "district_id=" +
      this.state.district +
      "&date=" +
      "31-03-2021";

    fetch(url)
      .then((response) => {
        console.log("response", response);
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        if (data["sessions"].length < 1) {
          notification.warning({
            message: "Not Available",
            description: "No session avilable",
          });
          this.setState({
            is_available: false,
            available_session: data["sessions"],
          });
        } else {
          this.setState({
            available_session: data["sessions"],
            is_available: true,
          });
        }
      })
      .catch((error) => {
        console.log("error: " + error);
        notification.warning({
          message: "Alert",
          description: "Unable to collect districts",
        });
        this.setState({
          available_session: [],
          is_available: false,
        });
      });
  }

  onSelectState(e) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "hindi",
      },
    };
    var url = BASE_URL + "/v2/admin/location/districts/" + e;

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        this.setState({ districts: data["districts"] });
        console.log("txnid", data);
      })
      .catch((error) => {
        console.log("error: " + error);
        notification.warning({
          message: "Alert",
          description: "Unable to collect districts",
        });
      });
  }

  handleChange() {
    this.setState({
      checked: !this.state.checked,
    });
    this.handleChangeColor();
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "hindi",
      },
    };
    var url = BASE_URL + "/v2/admin/location/states";

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        this.setState({ states: data["states"] });
        console.log("txnid", data);
      })
      .catch((error) => {
        console.log("error: " + error);
        notification.warning({
          message: "Alert",
          description: "Unable to collect states",
        });
      });
  }

  findSessions() {
    var url =
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
      this.state.pin +
      "&date=" +
      "31-03-2021";

    fetch(url)
      .then((response) => {
        console.log("response", response);
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        if (data["sessions"].length < 1) {
          notification.warning({
            message: "Not Available",
            description: "No session avilable",
          });
          this.setState({
            is_available: false,
            available_session: data["sessions"],
          });
        } else {
          this.setState({
            available_session: data["sessions"],
            is_available: true,
          });
        }
      })
      .catch((error) => {
        console.log("error: " + error);
        notification.warning({
          message: "Alert",
          description: "Unable to collect districts",
        });
        this.setState({
          available_session: [],
          is_available: false,
        });
      });
  }

  render() {
    return (
      <>
        <Row style={{ paddingTop: "10%" }}>
          <Col span={14} offset={5}>
            <Card>
              <label class="switch">
                <input type="checkbox" onChange={this.handleChange}></input>

                <span class="slider round">
                  <span
                    style={{
                      position: "relative",
                      left: "-95px",
                      bottom: "-10px",
                      color: this.state.color,
                    }}
                  >
                    <b>Search by Pin</b>
                  </span>
                  <span
                    style={{
                      position: "relative",
                      left: "95px",
                      bottom: "-10px",
                      color: this.state.color2,
                    }}
                  >
                    <b>Search by District</b>
                  </span>
                </span>
              </label>

              <Form style={{ paddingTop: "5%" }}>
                {!this.state.checked ? (
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="state"
                        rules={[
                          { required: true, message: "Please select state" },
                        ]}
                      >
                        <Select
                          style={{
                            width: "100%",
                            paddingLeft: "7%",
                          }}
                          placeholder="Select state"
                          onChange={this.onSelectState}
                        >
                          {this.state.states.map((value) => (
                            <Option key={value.state_id} value={value.state_id}>
                              {value.state_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Row>
                        <Col span={20}>
                          <Form.Item
                            name="district"
                            rules={[
                              {
                                required: true,
                                message: "Please select district",
                              },
                            ]}
                          >
                            <Select
                              style={{
                                width: "100%",
                                paddingLeft: "2%",
                              }}
                              placeholder="Select District"
                              onChange={this.setDistrict}
                            >
                              {this.state.districts.map((value) => (
                                <Option
                                  key={value.district_name}
                                  value={value.district_id}
                                >
                                  {value.district_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col style={{ paddingLeft: "3%" }}>
                          <Tooltip title="search">
                            <Form.Item>
                              <Button
                                size="large"
                                type="primary"
                                shape="circle"
                                onClick={this.getSession}
                                icon={<SearchOutlined />}
                              />
                            </Form.Item>
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ) : (
                  <SearchByPin
                    setpin={this.setPin}
                    findsession={this.findSessions}
                  />
                )}
              </Form>
            </Card>
            {this.state.is_available ? (
              <Session data={this.state.available_session} />
            ) : null}
          </Col>
        </Row>
      </>
    );
  }
}
