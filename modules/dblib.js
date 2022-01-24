const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser(name, rfid_id) {
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

async function markAttendance(userid) {
  const attendance = await prisma.attendance.create({
    data: {
      student_id: userid,
      status: true,
      date: new Date(),
    },
  });
  console.log("Attendance marked id:", attendance);
  return attendance;
}

async function getUser(rfid_id) {
  const user = await prisma.student_detail.findUnique({ where: { rfid_id } });
  return user;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

async function isTodayAttendanceMarked(userid) {
  var prevDaySchoolClosingTime = new Date();
  prevDaySchoolClosingTime.setDate(prevDaySchoolClosingTime.getDate() - 1); //set to yesterday
  // prevDaySchoolClosingTime.setHours(15, 00, 00); //set time to 3 pm
  console.log(new Date());

  const attendance = await prisma.attendance.findMany({
    where: {
      student_id: userid,
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

async function toggleTodayAttendance(attId, status) {
  const todayAttendance = await prisma.attendance.update({
    data: { status: !status },
    where: { id: attId },
  });

  return todayAttendance;
}

async function toggleOrMarkAttendance(rfid_id) {
  const user = await getUser(rfid_id);
  if (user) {
    var todayAtt = await isTodayAttendanceMarked(user.id);

    if (!todayAtt.isMarked) {
      return await markAttendance(user.id);
    } else {
      return await toggleTodayAttendance(todayAtt.id, todayAtt.status);
    }
  } else {
    console.log("No user: ", user);
    return null;
  }
}

// markAttendance(";d46279c0?e");

// isTodayAttendanceMarked(3).then((res) => console.log(res));

// toggleOrMarkAttendance(";d46279c0?e");

// createUser("Bhavdeep Dhaduk", ";70a8d840?e");

module.exports = {
  createUser,
  toggleOrMarkAttendance,
};
