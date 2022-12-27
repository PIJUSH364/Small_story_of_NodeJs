const express = require('express');
const mongoose = require('mongoose');
const checkLogin = require('../middlewares/checkLogin');
const todoSchema = require('../schemas/todoSchema');
const userSchema = require('../schemas/userSchema');
const router = express.Router();
const Todo = new mongoose.model('Todo', todoSchema);
const User = new mongoose.model('User', userSchema);

// active todo with async await
router.get('/active', async (req, res) => {
  const todo = new Todo();
  try {
    const data = await todo.findActive();
    res.status(200).json({
      result: data,
      message: 'all active todos!',
    });
  } catch (error) {
    res.status(500).json({
      error: 'There was a server side error!',
    });
  }
});

// active todo with callBack
router.get('/active_callback', (req, res) => {
  const todo = new Todo();
  todo.findActiveCallback((err, data) => {
    if (err) {
      res.status(500).json({
        error: 'There was a server side error!',
      });
    } else {
      res.status(200).json({
        result: data,
        message: 'all active todos!',
      });
    }
  });
});

// js tile todo find
router.get('/js', checkLogin, async (req, res) => {
  console.log(req.username);
  const data = await Todo.findByJs();
  res.status(200).json({
    result: data,
    message: 'all js title todo!',
  });
});

// language specific todo find
router.get('/language', async (req, res) => {
  const data = await Todo.find().byLanguage('react');
  res.status(200).json({
    result: data,
    message: 'all language title todo!',
  });
});

// get all the TODO
// router.get('/', async (req, res) => {
//   Todo.find({ status: 'active' }, (err, data) => {
//     if (err) {
//       res.status(500).json({
//         error: 'There was a server side error!',
//       });
//     } else {
//       res.status(200).json({
//         result: data,
//         message: 'successfully!',
//       });
//     }
//   });
// });

// ? modern way data get specific field
// router.get('/', async (req, res) => {
//   Todo.find({ status: 'active' })
//     .select({ _id: 0, date: 0 })
//     .limit(2)
//     .exec((err, data) => {
//       if (err) {
//         res.status(500).json({
//           error: 'There was a server side error!',
//         });
//       } else {
//         res.status(200).json({
//           result: data,
//           message: 'successfully!',
//         });
//       }
//     });
// });

// ? with relational data base
router.get('/', checkLogin, async (req, res) => {
  Todo.find({})
    .populate('user', 'name username -_id')
    .select({ _id: 0, date: 0 })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: 'There was a server side error!',
        });
      } else {
        res.status(200).json({
          result: data,
          message: 'successfully!',
        });
      }
    });
});

// get A TODO by Id
router.get('/:id', async (req, res) => {});

// post TODO(with authrenction)
router.post('/', checkLogin, async (req, res) => {
  const newTodo = new Todo({ ...req.body, user: req.userId });
  try {
    const todo = await newTodo.save();
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
    res.status(200).json({
      message: 'Todo were inserted successfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was a server side error!',
    });
  }
});

// post  multiple TODO
router.post('/all', async (req, res) => {
  Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: 'There was a server side error!',
      });
    } else {
      res.status(200).json({
        message: 'Todo were inserted successfully!',
      });
    }
  });
});

// put TODO//? only update one data
// router.put('/:id', async (req, res) => {
//   Todo.updateOne(
//     { _id: req.params.id },
//     {
//       $set: { status: 'inactive' },
//     },
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           error: 'There was a server side error!',
//         });
//       } else {
//         res.status(200).json({
//           message: 'Todo updated  successfully!',
//         });
//       }
//     }
//   );
// });

// ?put todo and return updated data
router.put('/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { status: 'inactive' },
      },
      { new: true }
    );
    res.status(200).json({
      data: result,
      message: 'Todo updated  successfully!',
    });
  } catch (error) {
    res.status(500).json({
      error: 'There was a server side error!',
    });
  }
});

// delete TODO
router.delete('/:id', async (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: 'There was a server side error!',
      });
    } else {
      res.status(200).json({
        message: ' todo deleted successfully!',
      });
    }
  });
});

module.exports = router;
