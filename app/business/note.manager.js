import NoteDAO from '../DAO/noteDAO'
import applicationException from '../service/applicationException';


function create(context) {

  async function findAllNotes(userId) {
    const notes = await NoteDAO.getAllNotesByUserId(userId);
    if (!notes) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Notes for that user id do not exists');
    }
    return notes;
  }

  async function findUserBooks(userId) {
    const notes = await NoteDAO.getBooksByUserId(userId);
    if (!notes) {
      throw applicationException.new(applicationException.NOT_FOUND, 'Books for that user id do not exists');
    }
    return notes;
  }

  return {
    findAllNotes: findAllNotes,
    findUserBooks:findUserBooks
  };
}

export default {
  create: create
};
