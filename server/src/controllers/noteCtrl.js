import Note from "./../models/noteModel.js";

export const fetchData = async (req, res) => {
	try {
		const result = await Note.find();
		res.json(result);
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const addNote = async (req, res) => {
	try {
		const { title } = req.body;
		if (!title) {
			return res.status(400).json({ msg: "Bạn chưa nhập công việc nào !" });
		}
		const newNote = new Note(req.body);
		await newNote.save();
		res.json({ msg: "Thêm công việc thành công !", note: newNote });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const updateNote = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(404).json({ msg: "Không tồn tại" });
		}
		const result = await Note.findByIdAndUpdate({ _id: id }, req.body, { new: true });
		res.json({ msg: "Cập nhập công việc thành công !", note: result });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const removeNote = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ msg: "Không tồn tại" });
		}
		const result = await Note.findByIdAndDelete({ _id: id });

		res.json({ msg: "Xóa công việc thành công !", noteDeleted: result });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
