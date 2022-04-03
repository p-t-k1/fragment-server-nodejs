
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

async function getBooksByUserId(userId) {
  const result = await NoteModel.find( { "userId": ObjectId(userId) } ).distinct("cover");
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'Books not found');
}

export default {
  getAllNotesByUserId:getAllNotesByUserId,
  getBooksByUserId:getBooksByUserId,

  model:NoteModel
};
