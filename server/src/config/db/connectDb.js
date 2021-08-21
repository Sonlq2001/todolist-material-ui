import mongoose from "mongoose";

const connect = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://sonel:sonel123@cluster0.xi3sv.mongodb.net/CRUD?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			}
		);

		console.log("Connect db successfully");
	} catch (error) {
		console.log("Connect db fail");
	}
};

export default { connect };
