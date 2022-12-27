const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['active', 'inactive'] },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance method
todoSchema.methods = {
  findActive: function () {
    return mongoose
      .model('Todo')
      .find({ status: 'active' })
      .select({ _id: 0, date: 0 });
  },
};
module.exports = todoSchema;
