import "./App.css";
import Cowin from "./Components/MobileOtp";
import MobileOtp from "./Components/MobileOtp";
import validateOtp from "./Components/validateOtp";
import findBy from "./Components/findBy";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={MobileOtp} />
					<Route path="/validate_otp" component={validateOtp} />
					<Route path="/find" component={findBy} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
