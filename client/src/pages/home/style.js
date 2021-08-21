import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => {
	return {
		home: {
			marginTop: "100px",
		},
		btnSubmit: {
			width: "150px",
			height: "56px",
		},
		txt_word: {
			maxWidth: "400px",
		},
	};
});

export default useStyle;
