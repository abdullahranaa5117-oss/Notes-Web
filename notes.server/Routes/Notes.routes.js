const express = require('express');
const router = express.Router();
const NotesController = require('../controller/Notes.controller');
const { authenticate } = require('../middleware/auth')


router.get('/', authenticate, NotesController.getNotes);
router.post('/', authenticate, NotesController.createnewNotes);
router.put('/:id', authenticate, NotesController.updateNotes);
router.delete('/:id', authenticate, NotesController.deleteNotes);

module.exports = router;
