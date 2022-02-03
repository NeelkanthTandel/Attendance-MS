const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function createStudent(name, rfid_id) {
  const user = await prisma.student_detail.create({
    data: {
      name,
      rfid_id,
    },
  });
  // const user = await prisma.student_detail.delete({ where: { id: 2 } });
  console.log("Done creating new student", user);
  // console.log("Done");
}

function hashPassword(password) {
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    console.log("Hash Psas: ", hash);

    return hash;

    // bcrypt.compare("someOtherPlaintextPassword", hash, function (err, result) {
    //   // result == false
    //   console.log("Result: ", result);
    // });
  });
}

async function createTeacher(teacherId, name, password) {
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    // Store hash in your password DB.
    console.log("Hash Psas: ", hash);

    if (hash) {
      const user = await prisma.teacher_detail.create({
        data: {
          name,
          teacher_id: teacherId.toUpperCase(),
          password: hash,
        },
      });
      return user;
    }
    return err;
  });
}

async function getTeacher(userId) {
  const user = await prisma.teacher_detail.findUnique({
    where: {
      teacher_id: userId.toUpperCase(),
    },
  });
  return user;
}

async function markAttendance(stu_id) {
  const attendance = await prisma.attendance.create({
    data: {
      student_id: stu_id,
      status: true,
      date: new Date(),
    },
  });
  console.log("Attendance marked id:", attendance);
  return attendance;
}

async function getStudent(rfid_id) {
  const user = await prisma.student_detail.findUnique({ where: { rfid_id } });
  return user;
}

async function isTodayAttendanceMarked(stu_id) {
  var prevDaySchoolClosingTime = new Date();
  prevDaySchoolClosingTime.setDate(prevDaySchoolClosingTime.getDate() - 1); //set to yesterday
  // prevDaySchoolClosingTime.setHours(15, 00, 00); //set time to 3 pm
  console.log(new Date());

  const attendance = await prisma.attendance.findMany({
    where: {
      student_id: stu_id,
      date: {
        equals: new Date(),
      },
    },
  });

  console.log("Today's attendance detail: ", attendance[0]);
  if (attendance[0]) {
    return {
      isMarked: true,
      id: attendance[0].id,
      status: attendance[0].status,
    };
  } else {
    return { isMarked: false };
  }
}

async function modifyExistingAttendance(attId, status) {
  const todayAttendance = await prisma.attendance.update({
    data: { status },
    where: { id: attId },
  });

  return todayAttendance;
}

async function toggleOrMarkAttendance(rfid_id) {
  const user = await getStudent(rfid_id);
  if (user) {
    var todayAtt = await isTodayAttendanceMarked(user.stu_id);

    if (!todayAtt.isMarked) {
      return await markAttendance(user.stu_id);
    } else {
      return await modifyExistingAttendance(todayAtt.id, !todayAtt.status);
    }
  } else {
    console.log("No user: ", user);
    return null;
  }
}

const getAttendance = async (teacher_id, date) => {
  const teachDet = await prisma.teacher_detail.findUnique({
    select: {
      class_id: true,
    },
    where: {
      teacher_id,
    },
  });
  const stuDet = await prisma.student_detail.findMany({
    where: {
      class_id: teachDet.class_id,
    },

    select: {
      id: true,
      class_id: true,
      name: true,
      stu_id: true,
      attendance: {
        where: {
          date,
        },
        select: {
          status: true,
          id: true,
        },
      },
    },
  });
  // console.log(JSON.stringify(stuDet));
  return stuDet;
};

const getAllAttendance = async (class_id, onLyPresent) => {
  let whereData = {};

  if (onLyPresent) {
    whereData = {
      status: true,
    };
  }

  const stuDet = await prisma.student_detail.findMany({
    where: {
      class_id: class_id,
    },

    select: {
      id: true,
      class_id: true,
      name: true,
      stu_id: true,

      attendance: {
        orderBy: { date: "asc" },
        select: {
          id: true,
          date: true,
          status: true,
        },
        where: whereData,
      },
    },
  });
  // console.log(JSON.stringify(stuDet));
  return stuDet;
};

// getAllAttendance("class1A", true);

const updateAttendanceTable = async () => {
  const stu_id = await prisma.student_detail.findMany({
    select: { stu_id: true },
  });

  const att_det = [];

  for (var i = 0; i < stu_id.length; i++) {
    att_det.push({
      student_id: stu_id[i].stu_id,
      status: false,
      date: new Date(),
    });
  }

  const count = await prisma.attendance.createMany({
    data: att_det,
  });

  console.log(count);
};

const totalStudents = async () => {
  const count = await prisma.student_detail.count();
  return count;
};

const totalDistinctDay = async () => {
  const distinctDay = await prisma.attendance.groupBy({
    by: ["date"],
    orderBy: { date: "asc" },
    _count: {
      id: true,
    },
  });

  // console.log(count.length);
  return distinctDay;
};

// totalWorkingDays();

module.exports = {
  getTeacher,
  toggleOrMarkAttendance,
  getAttendance,
  updateAttendanceTable,
  totalStudents,
  modifyExistingAttendance,
  totalDistinctDay,
  getAllAttendance,
};
