const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;

var DUMMY_NOTES = [
  {
    id: "p1",
    title: "Empire",
    date: "12-12-2012",
    detail: "one ",
    creator: "u1",
  },
  {
    id: "p2",
    title: "The second Note",
    date: "12-12-2020",
    detail: "two",
    creator: "u2",
  },
];

const getNotesById = (req, res, next) => {
  const noteId = req.params.nid;
  const note = DUMMY_NOTES.find((n) => {
    return n.id === noteId;
  });
  if (!note) {
    throw new HttpError("Could not find a provided id ", 404);
  }
  res.json({ note });
};

const getNotesByUserId = (req, res) => {
  const userId = req.params.uid;
  const notes = DUMMY_NOTES.filter((n) => {
    return n.creator === userId;
  });
  if (!notes || notes.length === 0) {
    return next(new HttpError("Could not find a provided id ", 404));
  }
  res.json({ notes });
};

const createNote = (req, res, next) => {
  const { title, detail, date, creator } = req.body;

  const createdNote = {
    id: uuid(),
    title,
    date,
    detail,
    creator,
  };

  DUMMY_NOTES.push(createdNote);
  res.status(201).json({ notes: createdNote });
};

const updateNote = (req, res, next) => {
  const { title, detail } = req.body;

  const noteId = req.params.nid;
  const updateNote = { ...DUMMY_NOTES.find((p) => p.id === noteId) };
  const noteIndex = DUMMY_NOTES.findIndex((p) => p.id === noteId);
  updateNote.title = title;
  updateNote.detail = detail;
  DUMMY_NOTES[noteIndex] = updateNote;
  res.status(200).json({ notes: updateNote });
};

const deleteNote = (req, res, next) => {
  var noteId = req.params.nid;
  DUMMY_NOTES = DUMMY_NOTES.filter((p) => p.id !== noteId);
  res.status(200).json({ message: "deleted SuccesFully" });
};


exports.getNotesById = getNotesById;
exports.getNotesByUserId = getNotesByUserId;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;

