const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const data = fs.readFileSync("./data.json");
  res.send(JSON.parse(data));
});

app.get("/plus/hall", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));
  let { hall, kitchen, studyroom } = data;
  hall = hall + 1;
  fs.writeFileSync(
    "./data.json",
    `{
        "hall" : ${hall},
        "kitchen" : ${kitchen},
        "studyroom" : ${studyroom}
    }`
  );
  res.send(
    JSON.parse(`{
    "hall" : ${hall},
    "kitchen" : ${kitchen},
    "studyroom" : ${studyroom}
    }`)
  );
});

app.get("/minus/hall", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));

  let { hall, kitchen, studyroom } = data;
  if (hall > 0) {
    hall = hall - 1;
  }
  fs.writeFileSync(
    "./data.json",
    `{
          "hall" : ${hall},
          "kitchen" : ${kitchen},
          "studyroom" : ${studyroom}
      }`
  );
  res.send(
    JSON.parse(`{
      "hall" : ${hall},
      "kitchen" : ${kitchen},
      "studyroom" : ${studyroom}
      }`)
  );
});

app.get("/plus/studyroom", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));

  let { hall, kitchen, studyroom } = data;
  studyroom = studyroom + 1;
  fs.writeFileSync(
    "./data.json",
    `{
          "hall" : ${hall},
          "kitchen" : ${kitchen},
          "studyroom" : ${studyroom}
      }`
  );
  res.send(
    JSON.parse(`{
    "hall" : ${hall},
    "kitchen" : ${kitchen},
    "studyroom" : ${studyroom}
    }`)
  );
});

app.get("/minus/studyroom", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));

  let { hall, kitchen, studyroom } = data;
  if (studyroom > 0) {
    studyroom = studyroom - 1;
  }
  fs.writeFileSync(
    "./data.json",
    `{
            "hall" : ${hall},
            "kitchen" : ${kitchen},
            "studyroom" : ${studyroom}
        }`
  );
  res.send(
    JSON.parse(`{
      "hall" : ${hall},
      "kitchen" : ${kitchen},
      "studyroom" : ${studyroom}
      }`)
  );
});

app.get("/plus/kitchen", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));

  let { hall, kitchen, studyroom } = data;
  kitchen = kitchen + 1;
  fs.writeFileSync(
    "./data.json",
    `{
          "hall" : ${hall},
          "kitchen" : ${kitchen},
          "studyroom" : ${studyroom}
      }`
  );
  res.send(
    JSON.parse(`{
    "hall" : ${hall},
    "kitchen" : ${kitchen},
    "studyroom" : ${studyroom}
    }`)
  );
});

app.get("/minus/kitchen", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json"));

  let { hall, kitchen, studyroom } = data;
  if (kitchen > 0) {
    kitchen = kitchen - 1;
  }
  fs.writeFileSync(
    "./data.json",
    `{
            "hall" : ${hall},
            "kitchen" : ${kitchen},
            "studyroom" : ${studyroom}
        }`
  );
  res.send(
    JSON.parse(`{
      "hall" : ${hall},
      "kitchen" : ${kitchen},
      "studyroom" : ${studyroom}
      }`)
  );
});

app.listen(5000, () => {
  console.log("Server running on Port 5000");
});
