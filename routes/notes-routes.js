const express = require("express");
const noteController = require("../controller/notes-controller");
const router = express.Router();

router.get("/:nid", noteController.getNotesById);

router.get("/user/:uid", noteController.getNotesByUserId);

router.post("/", noteController.createNote);

router.patch("/:nid", noteController.updateNote);

router.delete("/:nid", noteController.deleteNote);

module.exports = router;