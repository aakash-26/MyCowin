import React from "react";
import { useHistory } from "react-router-dom";
import {
	Form,
	Card,
	Row,
	Col,
	Input,
	Button,
	Divider,
	notification,
} from "antd";

const BASE_URL = "https://cdn-api.co-vin.in/api";

export default class MobileOtp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mobile: "",
		};

		this.HandleChange = this.HandleChange.bind(this);
		this.HandleValidation = this.HandleValidation.bind(this);
		this.HandleSubmit = this.HandleSubmit.bind(this);
	}

	HandleChange(event) {
		this.setState({
			mobile: event.target.value,
		});
	}

	HandleValidation() {
		var pattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
		if (!pattern.test(this.state.mobile)) {
			notification.error({
				message: "Invalid Input",
				description: "Enter valid mobile Number.",
			});

			return false;
		}
		return true;
	}

	HandleSubmit() {
		var v = this.HandleValidation();
		if (v) {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ mobile: this.state.mobile }),
			};
			var url = BASE_URL + "/v2/auth/public/generateOTP";

			fetch(url, requestOptions)
				.then((response) => {
					if (!response.ok) throw new Error(response.status);
					else return response.json();
				})
				.then((data) => {
					notification.success({
						message: "Otp sent",
						description:
							"The requested Otp has been sent to " +
							this.state.mobile,
					});
					console.log("txnid",data)
					this.props.history.push({
						pathname: "/validate_otp",
						state: {
							key: data["txnId"],
						},
					});
				})
				.catch((error) => {
					console.log("error: " + error);
					notification.warning({
						message: "Otp already sent",
						description: "The requested Otp has been already sent",
					});
				});
		}
	}

	render() {
		return (
			<>
				<Row style={{ paddingTop: "10%" }}>
					<Col span={8} offset={8}>
						<Card
							style={{ width: 300 }}
							title="Enter Mobile Number"
							description="This is the description"
						>
							<Form>
								<Form.Item
									name="mobile"
									rules={[
										{
											required: true,
											message:
												"Please input your Mobile number!",
										},
									]}
								>
									<Input onChange={this.HandleChange} />
								</Form.Item>

								<Divider />

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										size="large"
										onClick={this.HandleSubmit}
										block
									>
										Genaerate Otp
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</Col>
				</Row>
			</>
		);
	}
}
