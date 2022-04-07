import NoteDAO from '../DAO/noteDAO'
import applicationException from '../service/applicationException';
import TokenDAO from "../DAO/tokenDAO";


function create(context) {

  async function findAllNotes(userId) {
    const notes = await NoteDAO.getAllNotesByUserId(userId);
    if (!notes) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Notes for that user id do not exists');
    }
    return notes;
  }

  async function createNewNote(data) {
    const note = await NoteDAO.createNewNote(data);
    if (!note) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Created note not found');
    }
    return note;
  }

  async function findUserBooks(userId) {
    const books = await NoteDAO.getBooksByUserId(userId);
    if (!books) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Books for that user id do not exists');
    }
    return books;
  }

  async function removeNoteById(id) {
    return await NoteDAO.removeById(id);
  }

  return {
    findAllNotes: findAllNotes,
    findUserBooks:findUserBooks,
    createNewNote:createNewNote,
    removeNoteById:removeNoteById
  };
}

export default {
  create: create
};
