require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5555;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

const dblib = require("./modules/dblib");

// app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

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

app.listen(parseInt(PORT), () => {
  console.log("Server is listening at port ", PORT);
});
