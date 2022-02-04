const Todo = require("../models/todoModel");

// let todoList = [
//   {
//     id: "1",
//     task: "buy meat",
//     done: false,
//     deadLine: new Date("2/15/22"),
//   },
//   {
//     id: "2",
//     task: "send email",
//     done: true,
//     deadLine: new Date("2/5/22"),
//   },
//   {
//     id: "3",
//     task: "meet to daughter",
//     done: false,
//     deadLine: new Date("2/3/22"),
//   },
// ];

const todo_index = (req, res) => {
  //console.log(todoList);
  //   res.render("todo/index", { title: "Main", todoList });
  Todo.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("todo/index", { title: "Main", todoList: result });
    })
    .catch((err) => console.log(err));
};

const todo_save_post = (req, res) => {
  //console.log(req.body);

  let todoList = req.body;
  let i = 0;
  todoList.forEach((item) => {
    if (item.deleted) {
      Todo.findByIdAndDelete(item.id, (err, result) => {
        if (err) {
          console.log("error db delete record ", err);
        } else {
          console.log("delete from db ", result.id);
        }
        res.end();
      });
    } else {
      if (!item.id) {
        item.id = Todo.newID();
      }
      item.deadLine = item.deadLine = new Date(Date.parse(item.deadLine));

      Todo.findByIdAndUpdate(
        item.id,
        item,
        // {
        //   task: item.task,
        //   done: item.done,
        //   deadLine: item.deadLine,
        // },
        { upsert: true },
        (err, result) => {
          if (err) {
            console.log("error db ", err);
          } else {
            if (result) {
              console.log("change save to db ", result.id);
            } else {
              console.log("new save to db ", result);
            }
          }
          res.end();
        }
      );
    }
    // if (item.id) {
    //   Todo.findById(item.id).then((result) => {
    //     if (
    //       item.task !== result.task ||
    //       item.done !== result.done ||
    //       item.deadLine !== result.deadLine
    //     ) {
    //       //   result = { item };
    //       //   result.save();
    //       Todo.findByIdAndUpdate(
    //         item.id,
    //         {
    //           task: item.task,
    //           done: item.done,
    //           deadLine: item.deadLine,
    //         },
    //         { upsert: true },
    //         function (err, result) {
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             console.log(result);
    //           }
    //         }
    //       );
    //       console.log("change save to db" + result.id);
    //     }
    //   });
    // } else {
    //   todo = new Todo(item);
    //   todo.save();
    //   console.log("new save to db" + todo.id);
    // }
  });
};

const todo_delete = (req, res) => {
  const id = req.params.id;
  let resultJSON;
  if (id) {
    Todo.findByIdAndDelete(id).then((result) => (resultJSON = "deleted"));
  } else {
    resultJSON = "deleted";
  }
  res.json({ resultJSON });
  res.end();
};

module.exports = {
  todo_index,
  todo_save_post,
  todo_delete,
};
