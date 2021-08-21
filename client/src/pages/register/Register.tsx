import React from "react";
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
	Box,
	FormHelperText,
} from "@material-ui/core";
import useStyle from "./style";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputField from "./../../customField/InputField";
import ButtonFiled from "./../../customField/ButtonField";

import { valueFormRegister } from "./../../interface/interface";
import { userRegister } from "./../../redux/slices/userSlice";
import { RootState } from "./../../redux/store";

const Register = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const history = useHistory();
	const { msg } = useSelector((state: RootState) => state.user);
	const initialValues: valueFormRegister = { name: "", email: "", password: "" };

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>

				{msg && (
					<Box>
						<FormHelperText error>{msg}</FormHelperText>
					</Box>
				)}

				<Formik
					initialValues={initialValues}
					onSubmit={(values: valueFormRegister) => {
						const mixValue: any = { history, values };
						dispatch(userRegister(mixValue));
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().required("Vui lòng nhập tên !"),
						email: Yup.string()
							.email("Email không phù hợp !")
							.required("Vui lòng nhập email !"),
						password: Yup.string()
							.trim()
							.min(8, "Độ dài mật khẩu tối thiểu 8 kí tự")
							.required("Vui lòng nhập mật khẩu !")
							.matches(
								/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
								"Yêu cầu có 1 số, 1 kí tự thường và 1 kí tự in hoa"
							),
					})}
				>
					{() => {
						return (
							<Form className={classes.form}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={12}>
										<InputField name="name" label="Họ và tên" />
									</Grid>

									<Grid item xs={12}>
										<InputField name="email" label="Email" />
									</Grid>
									<Grid item xs={12}>
										<InputField name="password" label="Mật khẩu" />
									</Grid>
								</Grid>

								<ButtonFiled className={classes.submit}>Register</ButtonFiled>

								<Grid container justifyContent="flex-end">
									<Grid item>
										<Link to="/login">Bạn đã có tài khoản</Link>
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

export default Register;
