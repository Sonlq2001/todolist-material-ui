import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./../models/userModel.js";

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!email || !name || !password) {
			return res.status(404).json({ msg: "Vui lòng nhập đầy đủ thông tin" });
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.status(500).json({ msg: "Tài khoản đã được đăng ký !" });
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = new User({ name, email, password: hashPassword });
		const result = await newUser.save();
		const token = jwt.sign({ id: result._id }, "SECRET", { expiresIn: "1h" });
		const resUser = {
			_id: result._id,
			name: result.name,
			email: result.email,
		};
		res.json({
			msg: "Register successfully",
			resUser,
			token,
		});
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(401).json({ msg: "Vui lòng nhập đầy đủ thông tin !" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "Tài khoản không tồn tại" });
		}

		const checkPassword = await bcrypt.compare(password, user.password);
		if (checkPassword) {
			const token = jwt.sign({ id: user._id }, "SECRET", { expiresIn: "1h" });
			const resUser = {
				_id: user._id,
				name: user.name,
				email: user.email,
			};
			res.json({
				msg: "Login successfully",
				resUser,
				token,
			});
		} else {
			return res.status(401).json({ msg: "Mật khẩu không chính xác" });
		}
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
