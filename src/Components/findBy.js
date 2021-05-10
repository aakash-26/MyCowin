import React from "react";
import test from "./test";
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
var x = "";
const searchState = (
	<Row>
		<Col span={12}>
			<Select
				style={{
					width: "100%",
					paddingLeft: "7%",
				}}
				placeholder="Select state"
			>
				{x}
			</Select>
		</Col>
		<Col span={12}>
			<Row>
				<Col span={20}>
					<Select
						style={{
							width: "100%",
							paddingLeft: "2%",
						}}
						placeholder="Select District"
					>
						<Option></Option>
					</Select>
				</Col>
				<Col style={{ paddingLeft: "3%" }}>
					<Tooltip title="search">
						<Button
							size="large"
							type="primary"
							shape="circle"
							icon={<SearchOutlined />}
						/>
					</Tooltip>
				</Col>
			</Row>
		</Col>
	</Row>
);

const searcByPin = (
	<Row>
		<Col span={24}>
			<Row style={{ paddingLeft: "2%" }}>
				<Col span={22}>
					<Input placeholder="Enter your pin" />
				</Col>
				<Col style={{ paddingLeft: "2%" }}>
					<Tooltip title="search">
						<Button
							size="large"
							type="primary"
							shape="circle"
							icon={<SearchOutlined />}
						/>
					</Tooltip>
				</Col>
			</Row>
		</Col>
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
			opt: ["akash", "aniket"],
		};

		var x = this.state.opt.map((v) => <Option key={v}>{v}</Option>);

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeColor = this.handleChangeColor.bind(this);
	}

	handleChangeColor() {
		if (this.state.checked) {
			this.setState({ color: "black", color2: "white" });
		} else {
			this.setState({ color: "white", color2: "black" });
		}
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
				notification.success({
					message: "Otp sent",
					description:
						"The requested Otp has been sent to " +
						this.state.mobile,
				});
				console.log("txnid", data);
			})
			.catch((error) => {
				console.log("error: " + error);
				notification.warning({
					message: "Otp already sent",
					description: "The requested Otp has been already sent",
				});
			});
	}

	render() {
		return (
			<>
				<Row style={{ paddingTop: "10%" }}>
					<test />

					<Col span={14} offset={5}>
						<Card>
							<label class="switch">
								<input
									type="checkbox"
									onChange={this.handleChange}
								></input>

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
								{this.state.checked ? searchState : searcByPin}
							</Form>
						</Card>
					</Col>
				</Row>
			</>
		);
	}
}
