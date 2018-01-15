var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  picture: String,
  price: Number,
  author: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

BookSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  next();
});

BookSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findByOne: function(cb) {
    return this
      .findOne({})
      .sort({id: -1})
      .exec(cb);
  },
  del: function(id, cb) {
    return this
      .remove({id: id})
      .exec(cb);
  }
}

module.exports = BookSchema;
