import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import {
	Container,
	Typography,
	CssBaseline,
	Avatar,
	Grid,
	FormHelperText,
	Box,
} from "@material-ui/core";
import useStyle from "./../register/style";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import InputField from "./../../customField/InputField";
import ButtonFiled from "./../../customField/ButtonField";

import { ValueForm } from "../../types/shape";
import { userLogin } from "./../../redux/slices/userSlice";
import { RootState } from "./../../redux/store";

const Login = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const history = useHistory();
	const initialValues: ValueForm = { username: "", password: "" };
	const { msg, user } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (user) history.push("/");
	}, [user, history]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>

				{msg && (
					<Box>
						<FormHelperText error>{msg}</FormHelperText>
					</Box>
				)}

				<Formik
					initialValues={initialValues}
					onSubmit={(values: ValueForm) => {
						dispatch(userLogin(values));
					}}
					validationSchema={Yup.object().shape({
						username: Yup.string().required("Vui lòng nhập tài khoản !"),
						password: Yup.string().trim().required("Vui lòng nhập mật khẩu !"),
					})}
				>
					{() => {
						return (
							<Form className={classes.form}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<InputField name="username" label="Tài khoản" />
									</Grid>
									<Grid item xs={12}>
										<InputField name="password" label="Mật khẩu" type="password" />
									</Grid>
								</Grid>

								<ButtonFiled className={classes.submit}>Login</ButtonFiled>

								<Grid container justifyContent="flex-end">
									<Grid item>
										<Link to="/register">Bạn chưa có tài khoản? Đăng kí ?</Link>
									</Grid>
								</Grid>
							</Form>
						);
					}}
				</Formik>
			</div>
		</Container>
	);
};

export default Login;
