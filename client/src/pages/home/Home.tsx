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

import { Todo } from "../../types/shape";
import { addNote, fetchData, removeNote, updateNote } from "./../../redux/slices/noteSlice";
import { getUser } from "./../../redux/slices/userSlice";
import ButtonField from "./../../customField/ButtonField";
import InputField from "./../../customField/InputField";
import { RootState } from "./../../redux/store";

const Home = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const [status, setStatus] = useState(true);
	const [valueForm, setValueForm] = useState<Todo>({ id: "", content: "" });

	const { user } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	// gọi dữ liệu
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch, user]);
	const { loading, data } = useSelector((state: RootState) => state.note);
	// xóa
	const handleRemove = (id: string | number | undefined) => {
		dispatch(removeNote(id));
	};

	// cập nhập trạng thái
	const handleChecked = (item: any) => {
		const newObj = { ...item };
		if (newObj.status === "completed") {
			newObj.status = "active";
		} else {
			newObj.status = "completed";
		}
		dispatch(updateNote(newObj));
	};

	// cập nhập nội dung
	const handleUpdate = (item: Todo) => {
		setStatus(false);
		setValueForm({ ...valueForm, content: item.content, id: item.id });
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
							onSubmit={(value: Todo, { resetForm }) => {
								if (status) {
									dispatch(addNote(value));
								} else {
									dispatch(updateNote(value));
									setStatus(true);
									setValueForm({ id: "", content: "" });
								}
								resetForm();
							}}
							validationSchema={Yup.object().shape({
								content: Yup.string().required("Bạn chưa điền công việc nào !"),
							})}
						>
							{() => {
								return (
									<>
										<Form>
											<Box display="flex">
												<InputField
													type="text"
													name="content"
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

						<Box>
							<List>
								{data.map((item: Todo) => {
									let status = item.status === "active" ? false : true;
									return (
										<ListItem button key={item.id}>
											<ListItemIcon>
												<Checkbox
													edge="start"
													tabIndex={-1}
													disableRipple
													checked={status}
													onChange={() => handleChecked(item)}
												/>
											</ListItemIcon>
											<ListItemText
												primary={item.content}
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
													onClick={() => handleRemove(item.id)}
												>
													<DeleteIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									);
								})}
							</List>
						</Box>
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
