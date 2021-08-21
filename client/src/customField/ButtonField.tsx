import React from "react";

import { useFormikContext } from "formik";
import { Button } from "@material-ui/core";

const ButtonField = ({ children, ...other }: any) => {
	const { submitForm } = useFormikContext();

	const configButton = {
		...other,
		onClick: submitForm,
		fullWidth: true,
		color: "primary",
		variant: "contained",
	};

	return <Button {...configButton}>{children}</Button>;
};

export default ButtonField;
