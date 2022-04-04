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
const saltRounds = 10;

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

app.post("/getAttendance", requireToken, async (req, res) => {
  try {
    const user = req.user;
    const { date, classId } = req.body;
    console.log("\n/getAttendance");
    if (!user || !date) {
      console.log("Details not found");
      return res
        .status(422)
        .send({ isError: true, message: "Details must be provided" });
    }
    console.log(user.teacher_id, " ", date, " ", classId);

    const stuAtt = await dblib.getAttendance(user.teacher_id, date, classId);
    // console.log(stuAtt);
    return res.status(200).send({ isError: false, stu_att: stuAtt });
  } catch (err) {
    console.log("get attendance error: ", err);
    res.status(400).send({ isError: true, message: err.message });
  }
});

app.get("/getTeacherList", requireToken, async (req, res) => {
  try {
    console.log("/getTeacherList");
    const teacherList = await prisma.teacher_detail.findMany({
      orderBy: { teacher_id: "asc" },
      include: {
        class_detail: {
          select: {
            standard: true,
            div: true,
          },
        },
      },
    });
    return res.status(200).send({ isError: false, teacherList });
  } catch (err) {
    console.log("getTeacherList: ", err);
    return res.status(400).send({ isError: true, message: err.message });
  }
});

app.post("/getStudentList", requireToken, async (req, res) => {
  console.log("/getStudentList");
  const classId = req.body.classId;
  if (!classId) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }
  try {
    const studentList = await prisma.student_detail.findMany({
      orderBy: { stu_id: "asc" },
      where: {
        class_id: classId,
        // is_deleted: false,
      },
      include: {
        class_detail: {
          select: {
            standard: true,
            div: true,
          },
        },
      },
    });
    return res.status(200).send({ isError: false, studentList });
  } catch (err) {
    console.log("getStudentList: ", err);
    return res.status(400).send({ isError: true, message: err.message });
  }
});

app.post("/addTeacher", requireToken, async (req, res) => {
  console.log("/addTeacher");
  const { name, teacher_id, password, mail_id, phone_number, class_id } =
    req.body;

  if (
    !name ||
    !teacher_id ||
    !password ||
    !mail_id ||
    !phone_number ||
    !class_id
  ) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }

  // if (name.toLowerCase() === "hetvi soni" || name.toLowerCase() === "hetvi") {
  //   console.log("Special restrictions");
  //   return res
  //     .status(422)
  //     .send({ isError: true, message: "This person is not allowed" });
  // }

  try {
    const user = await prisma.teacher_detail.findFirst({
      where: {
        OR: [
          {
            teacher_id,
          },
          {
            mail_id,
          },
          {
            phone_number,
          },
        ],
      },
    });

    if (user) {
      console.log("User exist with same details", user);
      if (user.teacher_id === teacher_id) {
        return res.status(400).send({
          isError: true,
          isUserExist: true,
          message: "User with this teacher id already exist",
        });
      } else if (user.mail_id === mail_id) {
        return res.status(400).send({
          isError: true,
          isUserExist: true,
          message: "User with this mail id already exist",
        });
      } else if (user.phone_number === phone_number) {
        return res.status(400).send({
          isError: true,
          isUserExist: true,
          message: "User with this phone number already exist",
        });
      }
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      console.log("Hash Psas: ", hash);

      if (hash) {
        try {
          const user = await prisma.teacher_detail.create({
            data: {
              name: name,
              teacher_id: teacher_id,
              password: hash,
              mail_id: mail_id,
              phone_number: phone_number,
              // address: address,
              class_id: class_id,
              isAdmin: false,
            },
          });
          console.log("id:", user.teacher_id);
          return res.status(200).send({
            isError: false,
            isUserExist: false,
            teacher_id: user.teacher_id,
          });
        } catch (upload_err) {
          console.log("err:", upload_err);
          console.log("addTeacher: ", err);
          return res
            .status(400)
            .send({ isError: true, message: upload_err.message });
        }
      }
      console.log(teacher_id, ": ", err);
      // const res = { isError: true, err };
      return res
        .status(400)
        .send({ isError: true, isUserExist: false, message: err });
    });
    // const data = await dblib.createTeacher(teacher_det);
    // console.log(data);
  } catch (err) {
    console.log("addTeacher: ", err);
    return res.status(400).send({ isError: true, message: err.message });
  }
});

app.post("/deleteTeacher", requireToken, async (req, res) => {
  console.log("/deleteTeacher");
  const { teacher_id } = req.body;

  if (!teacher_id) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }

  try {
    const teacher = await prisma.teacher_detail.delete({
      where: {
        teacher_id,
      },
    });

    console.log(teacher);
    if (teacher) {
      return res.status(200).send({
        isError: false,
        teacher_id: teacher.teacher_id,
      });
    }
  } catch (err) {
    console.log("deleteTeacher: ", err);
    return res.status(400).send({ isError: true, message: err.message });
  }
});

app.post("/addStudent", requireToken, async (req, res) => {
  console.log("/addStudent");
  const { name, stu_id, rfid_id, parents_number, class_id } = req.body;
  if (!name || !stu_id || !rfid_id || !parents_number || !class_id) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }

  // if (name.toLowerCase() === "hetvi soni" || name.toLowerCase() === "hetvi") {
  //   console.log("Special restrictions");
  //   return res
  //     .status(422)
  //     .send({ isError: true, message: "This person is not allowed" });
  // }

  try {
    const user = await prisma.student_detail.findFirst({
      where: {
        OR: [
          {
            stu_id,
          },
          {
            rfid_id,
          },
        ],
      },
    });

    if (user) {
      console.log("User exist with same details", user);
      if (user.stu_id === stu_id) {
        return res.status(400).send({
          isError: true,
          isUserExist: true,
          message: "Student with this student id already exist",
        });
      } else if (user.rfid_id === rfid_id) {
        return res.status(400).send({
          isError: true,
          isUserExist: true,
          message: "Student with this RFID already exist",
        });
      }
    }

    const stuDet = {
      stu_id,
      name,
      rfid_id,
      parents_number,
      class_id,
    };

    const newStu = await dblib.createStudent(stuDet);
    console.log("id:", newStu.stu_id);
    return res.status(200).send({
      isError: false,
      isUserExist: false,
      student_id: newStu.stu_id,
    });

    // const data = await dblib.createTeacher(teacher_det);
    // console.log(data);
  } catch (err) {
    console.log("addStudent: ", err);
    return res.status(400).send({ isError: true, message: err.message });
  }
});

app.post("/deleteStudent", requireToken, async (req, res) => {
  console.log("/deleteStudent");
  const { stu_id } = req.body;

  if (!stu_id) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }

  try {
    const student = await prisma.student_detail.update({
      where: {
        stu_id,
      },
      data: {
        is_deleted: true,
      },
    });

    console.log(student);
    if (student) {
      return res.status(200).send({
        isError: false,
        stu_id: student.stu_id,
      });
    }
  } catch (err) {
    console.log("deleteStudent: ", err);
    return res.status(400).send({ isError: true, message: err.message });
  }
});

// app.get("/getClass", requireToken, async (req, res) => {
//   // const user = req.user;

//   try {
//     console.log("/getClass");
//     const classDet = await prisma.class_detail.findMany();
//     console.log(classDet);
//     return res.status(200).send({ isError: false, classDet });
//   } catch (err) {
//     console.log("Get Class error: ", err);
//     return res.status(400).send({ isError: true, message: err.message });
//   }
// });

//auth
app.get("/auth/me", requireToken, async (req, res) => {
  try {
    const classDet = await prisma.class_detail.findMany();
    const detCount = await dblib.countDetails();
    return res.status(200).send({
      isError: false,
      user: req.user,
      classDet,
      totalStudent: detCount.totalStu,
      studentsPresent: detCount.presentCount,
      totalTeacher: detCount.totalTeacher,
    });
  } catch (err) {
    console.log("me: ", err);
    return res.status(400).send({ isError: true, message: err.message });
  }
});

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

app.post("/modifyAttendance", requireToken, async (req, res) => {
  const updAttDet = req.body.updAttDet;
  console.log("/modifyAttendance");
  if (!updAttDet) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }

  if (!updAttDet[0]) {
    return res
      .status(422)
      .send({ isError: true, message: "Nothing to update" });
  }

  try {
    for (var i = 0; i < updAttDet.length; i++) {
      if (!updAttDet[i].attId) {
        console.log("Handler null attendance Id");
        continue;
      }

      const modifiedAtt = await dblib.modifyExistingAttendance(
        updAttDet[i].attId,
        updAttDet[i].status
      );

      // console.log(modifiedAtt);
    }
    return res.status(200).send({ isError: false, isUpdated: true });
  } catch (err) {
    console.log("modify attendance error: ", err);
    res.status(400).send({ isError: true, message: err.message });
  }
});

app.post("/getOverallAttendance", requireToken, async (req, res) => {
  const classId = req.body.classId;
  console.log("/getOverallAttendance");
  if (!classId) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }

  try {
    const totalStuAtt = await dblib.getAllAttendance(classId, true);
    return res.status(200).send({
      isError: false,
      totalStuAtt,
      totalWorkDays: (await dblib.totalDistinctDay()).length,
    });
  } catch (err) {
    console.log("get overall attendance error: ", err);
    res.status(400).send({ isError: true, message: err.message });
  }
});

app.post("/getDayAttendance", requireToken, async (req, res) => {
  const classId = req.body.classId;
  console.log("/getDayAttendance");
  if (!classId) {
    return res
      .status(422)
      .send({ isError: true, message: "Details must be provided" });
  }

  try {
    const totalStuAtt = await dblib.getAllAttendance(classId, false);
    return res.status(200).send({
      isError: false,
      totalStuAtt,
      workingDays: await dblib.totalDistinctDay(),
    });
  } catch (err) {
    console.log("get overall attendance error: ", err);
    res.status(400).send({ isError: true, message: err.message });
  }
});

const checkAndUpdateAttendanceDetail = async () => {
  let remTimeForNextDay = new Date();
  let nextMidNight = new Date();
  nextMidNight.setUTCDate(nextMidNight.getUTCDate() + 1);
  nextMidNight.setUTCHours(0, 0, 0);

  remTimeForNextDay.setUTCHours(
    nextMidNight.getUTCHours() - remTimeForNextDay.getUTCHours()
  );
  remTimeForNextDay.setUTCMinutes(
    nextMidNight.getUTCMinutes() - remTimeForNextDay.getUTCMinutes()
  );

  console.log("Attendance Update time: ", new Date());
  console.log("Next Midnight: ", nextMidNight);
  console.log("sys time: ", new Date().toLocaleString());

  let remHours = remTimeForNextDay.getUTCHours();
  let remMin = remTimeForNextDay.getUTCMinutes();

  // if (remMin >= 30) {
  //   remHours -= 5;
  //   remMin -= 30;
  // } else {
  //   remHours -= 6;
  //   remMin += 30;
  // }

  console.log("remaining time: ", remHours, ":", remMin);

  setTimeout(() => {
    setInterval(async () => {
      const totalAttendance = await prisma.attendance.count({
        where: {
          date: new Date(),
        },
      });

      console.log("Total attendance:", totalAttendance);
      console.log("Total students:", await dblib.totalStudents());
      if (totalAttendance == 0) {
        dblib.updateAttendanceTable();
      }
    }, 1000 * 60 * 60 * 24);
  }, 1000 * 60 * 60 * remHours + 1000 * 60 * remMin);

  const totalAttendance = await prisma.attendance.count({
    where: {
      date: new Date(),
    },
  });

  console.log("Total attendance:", totalAttendance);
  console.log("Total students:", await dblib.totalStudents());
  if (totalAttendance == 0) {
    dblib.updateAttendanceTable();
  }
};

app.listen(parseInt(PORT), () => {
  console.log("Server is listening at port ", PORT);
  checkAndUpdateAttendanceDetail();
});
