import React from "react";
import { sha256 } from "js-sha256";
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

export default class validateOtp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			otp: "",
		};

		// console.log("props---", this.props.location.state.key);

		this.HandleChange = this.HandleChange.bind(this);
		this.HandleSubmit = this.HandleSubmit.bind(this);
		console.log(sha256("314968"))
	}

	HandleChange(event) {
		this.setState({
			otp: sha256(event.target.value),
		});
	}
	HandleSubmit() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				otp: this.state.otp,
				txnId: this.props.location.state.key,
			}),
		};
		var url = BASE_URL + "/v2/auth/public/confirmOTP";
		console.log("request",requestOptions["body"])
		fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then((data) => {
				notification.success({
					message: "Success",
					description: "Otp validate Sucessfully",
				});

				console.log("token",data["token"])

				this.props.history.push({
					pathname: "/find",
					state: {
						key: data["token"],
					},
				});
			})
			.catch((error) => {
				console.log("error: " + error);
				notification.warning({
					message: "Error",
					description: "Wrong otp",
				});
			});
	}

	render() {
		return (
			<>
				<Row style={{ paddingTop: "10%" }}>
					<Col span={8} offset={8}>
						<Card style={{ width: 300 }} title="Validate Otp">
							<Form>
								<Form.Item
									name="otp"
									rules={[
										{
											required: true,
											message: "Please input your Otp!",
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
										Validate
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
