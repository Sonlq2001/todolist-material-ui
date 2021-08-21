import React from "react";
import { useField } from "formik";

import { TextField } from "@material-ui/core";

const InputField = (props: any) => {
	const [field, meta] = useField(props);

	const configField = {
		...field,
		...props,
		fullWidth: true,
		variant: "outlined",
	};

	if (meta && meta.error && meta.touched) {
		configField.error = true;
		configField.helperText = meta.error;
	}

	return <TextField {...configField} />;
};

export default InputField;
