require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5555;
const jwt = require("jsonwebtoken");
const jwtkey = process.env.JWTKEY;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
const bcrypt = require("bcrypt");

const dblib = require("./modules/dblib");
const requireToken = require("./middleware/requireToken");

// app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
  return res.send({ isServerUp: true });
});

app.post("/attendance/mark", async (req, res) => {
  console.log("/attendance/mark");
  const { rfid_id } = req.body;
  if (!rfid_id) {
    return res.status(422).send({ isError: true, message: "Got null rfid" });
  }

  try {
    const user = await dblib.toggleOrMarkAttendance(rfid_id);

    if (user && user.id) {
      console.log("Updated attendance:", user);
      return res.status(200).send({ isError: false });
    }

    return res.status(400).send({ isError: true, message: "Wrong Id" });
  } catch (err) {
    console.log("attendance mark error: ", err);
    return res.status(400).send({ isError: true, message: err.message });
  }
});

//auth

app.post("/auth/login", async (req, res) => {
  const { teacherId, password } = req.body;

  console.log("/auth/login");
  console.log(teacherId, password);

  if (!teacherId || !password) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }

  try {
    const user = await dblib.getTeacher(teacherId);
    // console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, async function (err, result) {
        // result == false
        console.log("Result: ", result);

        if (err) {
          console.log("Get User error: ", err);
          return res.status(400).send({ isError: true, message: err.message });
        }

        if (result) {
          console.log("User: ", user.name);
          const token = jwt.sign({ teacherId: user.teacher_id }, jwtkey);
          console.log(token);
          return res
            .status(200)
            .send({ isError: false, isCredMatch: true, user, token });
        } else {
          return res.status(200).send({ isError: false, isCredMatch: false });
        }
      });
    } else {
      return res.status(400).send({ isError: false, isCredMatch: false });
    }
  } catch (err) {
    console.log("Login error: ", err);
    res.status(400).send({ isError: true, message: err.message });
  }
});

//teacher module

app.post("/getAttendance", requireToken, async (req, res) => {
  try {
    const user = req.user;
    const { date } = req.body;
    console.log("/getAttendance");
    console.log(user.teacher_id, " ", date);

    const stuAtt = await dblib.getAttendance(user.teacher_id, date);
    console.log(stuAtt);
    return res.status(200).send({ isError: false, stu_att: stuAtt });
  } catch (err) {
    console.log("get attendance error: ", err);
    res.status(400).send({ isError: true, message: err.message });
  }
});

app.listen(parseInt(PORT), () => {
  console.log("Server is listening at port ", PORT);
});
