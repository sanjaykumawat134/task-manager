// crud operation using mongodb
const { MongoClient, ObjectID } = require("mongodb");

const databaseName = "task-manager";
// const connectionUrl =
//   "mongodb+srv://sanjaykumawat134:password@cluster0.uoxou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectionUrl = "mongodb://127.0.0.1:27017";

const id = new ObjectID();
console.log(id.getTimestamp());

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    // console.log("successfully connected")
    if (error) {
      return console.log(error);
    }
    if (client) {
      console.log("connected correctly");
      const db = client.db(databaseName);
      // db.collection("users").insertOne({
      //   name: "john doe",
      //   age: 25,
      // });

      //   db.collection("tasks").insertMany(
      //     [
      //       {
      //         description: "shopping",
      //         status: false,
      //       },
      //       {
      //         description: "study",
      //         status: false,
      //       },
      //       {
      //         description: "workout",
      //         status: true,
      //       },
      //     ],
      //     (error, result) => {
      //       if (error) {
      //         return console.log("unable to insert records");
      //       }
      //       console.log(result.ops);
      //     }
      //   );
      // db.collection("users")
      //   .find({ age: 25 })
      //   .toArray()
      //   .then((user) => {
      //     console.log(user);
      //   });
      db.collection("users")
        .updateOne(
          {
            _id: new ObjectID("60e82f4eeda7141b6cab0417"),
          },
          {
            $set: {
              name: "mike",
              age: 50,
            },
          }
        )
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
);
