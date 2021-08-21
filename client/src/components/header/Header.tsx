import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, AppBar, Toolbar, Typography, Grid, Box } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { RootState } from "./../../redux/store";
import { getUser } from "./../../redux/slices/userSlice";
import useStyle from "./style";
import { logout } from "./../../redux/slices/userSlice";

const Header = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const logOut = () => {
		dispatch(logout());
	};

	return (
		<>
			<div className="header">
				<AppBar>
					<Toolbar>
						<Container fixed>
							<Grid container>
								<Grid item lg={6}>
									<Box display="flex" alignItems="center">
										<Typography variant="h6">My note</Typography>
									</Box>
								</Grid>

								<Grid item lg={6}>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="flex-end"
										height="100%"
									>
										{user && (
											<Box display="flex">
												<AccountCircleIcon />
											</Box>
										)}
										{!user && (
											<Link to="/login" className={classes.header__link}>
												<Typography>Đăng nhập</Typography>
											</Link>
										)}
										{user && (
											<Box
												ml={4}
												style={{ cursor: "pointer" }}
												onClick={logOut}
											>
												<ExitToAppIcon />
											</Box>
										)}
									</Box>
								</Grid>
							</Grid>
						</Container>
					</Toolbar>
				</AppBar>
			</div>
		</>
	);
};

export default Header;
