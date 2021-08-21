import express from "express";
const Router = express.Router();

import { fetchData, addNote, updateNote, removeNote } from "./../controllers/noteCtrl.js";

Router.get("/notes", fetchData);
Router.post("/note-add", addNote);
Router.put("/note-update/:id", updateNote);
Router.delete("/note-remove/:id", removeNote);

export default Router;
