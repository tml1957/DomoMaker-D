const mongoose = require('mongoose');
const _ = require('underscore');

let DomoModel = {};

const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    require: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  color: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  color: doc.color,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    // Convert the string ownerID to an object id
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return DomoModel.find(search).select('name age color').lean().exec(callback);
};

DomoSchema.statics.findAll = (callback) => {
  return DomoModel.find().select('name age color').lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports = DomoModel;
