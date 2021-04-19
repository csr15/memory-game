const express = require("express");
const app = express();
const cors = require("cors");
const mongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const mongoDBClusterURI =
  "mongodb+srv://+++++++××××××++++++++retryWrites=true&w=majority";

//Port Configuration
const PORT = process.env.port || 8080;

//Cors setup for avoid cross-origin error
app.use(cors({ credentials: true }));
app.use(express.json());

//function to get colors from database based on limit
app.get("/api/v1/colors/:level", (req, res) => {
  const colors = [];

  mongoClient
    .connect(mongoDBClusterURI, { useUnifiedTopology: true })
    .then((client) => {
      client
        .db()
        .collection("colors")
        .find()
        .limit(parseInt(req.params.level))
        .forEach((data) => {
          colors.push(data);
        })
        .then(() => {
          res.send(colors);
        })
        .catch((err) => res.status(400).json("Something went wrong"));
    })
    .catch((mongoError) => {
      console.log(mongoError);
    });
});

//function for checking two selected cards and thier value
app.post("/api/v1/checkColors", (req, res) => {
  const colors = req.body;
  console.log(colors);
  mongoClient
    .connect(mongoDBClusterURI, { useUnifiedTopology: true })
    .then((client) => {
      client
        .db()
        .collection("colors")
        .findOne({ _id: ObjectId(req.body.colors[0]) })
        .then((result) => {
          console.log(result);

          client
            .db()
            .collection("colors")
            .findOne({ _id: ObjectId(req.body.colors[1]) })
            .then((mongoResult) => {
              if (result.color === mongoResult.color) {
                res.status(200).json({
                  isSame: true,
                  colorsId: [result._id, mongoResult._id],
                });
              } else {
                res.status(200).json({
                  isSame: false,
                });
              }
            })
            .catch((err) => {
              throw new Error();
            });
        })
        .catch((err) => {
          throw new Error();
        });
    })
    .catch((mongoError) => {
      res.status(400).json("Something went wrong!");
    });
});

//this will run the server on dedicated port
app.listen(PORT, () => console.log(`Server is running on port: ${8080}`));
