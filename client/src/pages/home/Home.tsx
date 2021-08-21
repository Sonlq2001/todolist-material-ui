import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	CssBaseline,
	Container,
	Typography,
	Box,
	List,
	ListItem,
	ListItemIcon,
	IconButton,
	ListItemText,
	ListItemSecondaryAction,
	Checkbox,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyle from "./style";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { valueWork } from "./../../interface/interface";
import { addNote, fetchData, removeNote, updateNote } from "./../../redux/slices/noteSlice";
import { getUser } from "./../../redux/slices/userSlice";
import ButtonField from "./../../customField/ButtonField";
import InputField from "./../../customField/InputField";
import { RootState } from "./../../redux/store";

const Home = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const [status, setStatus] = useState(true);
	// const [user, setUser] = useState(null);
	const [valueForm, setValueForm] = useState({ _id: "", title: "" });

	const { user } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	// gọi dữ liệu
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const { loading, data } = useSelector((state: RootState) => state.note);

	// xóa
	const handleRemove = (id: any) => {
		dispatch(removeNote(id));
	};

	// cập nhập trạng thái
	const handleChecked = (item: any) => {
		const newObj = { ...item };
		newObj.completed = !newObj.completed;
		dispatch(updateNote(newObj));
	};

	// cập nhập nội dung
	const handleUpdate = (item: any) => {
		setStatus(false);
		setValueForm({ ...valueForm, title: item.title, _id: item._id });
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<CssBaseline />
			{user ? (
				<Container maxWidth="sm" className={classes.home}>
					<Typography variant="h5" align="center">
						Danh sách công việc của bạn !
					</Typography>

					<Box mt={5}>
						<Formik
							enableReinitialize={true}
							initialValues={valueForm}
							onSubmit={(value: valueWork, { resetForm }) => {
								if (status) {
									dispatch(addNote(value));
								} else {
									dispatch(updateNote(value));
									setStatus(true);
									setValueForm({ _id: "", title: "" });
								}
								resetForm();
							}}
							validationSchema={Yup.object().shape({
								title: Yup.string().required("Bạn chưa điền công việc nào !"),
							})}
						>
							{() => {
								return (
									<>
										<Form>
											<Box display="flex">
												<InputField
													type="text"
													name="title"
													label="Công việc của bạn"
												/>
												<ButtonField
													height="100%"
													className={classes.btnSubmit}
												>
													{status ? "Add work" : "Edit work"}
												</ButtonField>
											</Box>
										</Form>
									</>
								);
							}}
						</Formik>

						{user ? (
							<Box>
								<List>
									{data.map((item: valueWork) => {
										return (
											<ListItem button key={item._id}>
												<ListItemIcon>
													<Checkbox
														edge="start"
														tabIndex={-1}
														disableRipple
														checked={item.completed}
														onChange={() => handleChecked(item)}
													/>
												</ListItemIcon>
												<ListItemText
													primary={item.title}
													className={classes.txt_word}
												/>
												<ListItemSecondaryAction>
													<IconButton
														edge="end"
														aria-label="comments"
														onClick={() => handleUpdate(item)}
													>
														<EditIcon />
													</IconButton>
													<IconButton
														edge="end"
														aria-label="comments"
														onClick={() => handleRemove(item._id)}
													>
														<DeleteIcon />
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										);
									})}
								</List>
							</Box>
						) : (
							<Typography>
								Bạn cần đăng nhập để viết các công việc của mình !
							</Typography>
						)}
					</Box>

					{data.length === 0 && <Box>Chưa có công việc nào !</Box>}
				</Container>
			) : (
				<Container maxWidth="sm" className={classes.home}>
					<Typography variant="h5" align="center">
						Hãy đăng nhập để ghi ra những công việc cần phải làm !
					</Typography>
				</Container>
			)}
		</div>
	);
};

export default Home;
