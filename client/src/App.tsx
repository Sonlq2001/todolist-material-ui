import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
const App = () => {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/" exact>
						<Header />
						<Switch>
							<Route exact path="/" component={Home} />
						</Switch>
					</Route>

					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
				</Switch>
			</Router>
		</>
	);
};

export default App;
