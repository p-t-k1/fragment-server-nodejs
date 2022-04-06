
import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';
import ObjectId from "mongoose/lib/drivers/browser/objectid";


const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: false },
  content: { type: String, required: true, unique: false },
  bookTitle: { type: String, required: false, unique: false },
  bookAuthor: { type: String, required: false, unique: false },
  cover: { type: String, required: false, unique: false },
}, {
  collection: 'note'
});

const NoteModel = mongoose.model('note', noteSchema);

async function getAllNotesByUserId(userId) {
  const result = await NoteModel.find( { "userId": ObjectId(userId) } );
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'Notes not found');
}

async function createNewNote(data) {
  console.log(JSON.stringify(data))
    const bookDetails = await NoteModel.findOne( { "cover":data.cover } );
    const result = await new NoteModel({ userId: data.userId,content:data.content,bookTitle:bookDetails.bookTitle,bookAuthor:bookDetails.bookAuthor,cover:data.cover}).save();
    if (result) {
      return mongoConverter(result);
    }
  throw applicationException.new(applicationException.FORBIDDEN, 'Could not create new note');
}

async function getBooksByUserId(userId) {
  const result = await NoteModel.distinct("cover",{ "userId": ObjectId(userId) });
  if (result) {
    return result;
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'Books not found');
}

export default {
  getAllNotesByUserId:getAllNotesByUserId,
  getBooksByUserId:getBooksByUserId,
  createNewNote:createNewNote,

  model:NoteModel
};
