const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const classDetails = [
  {
    standard: 0,
    div: "-",
    class_id: "admin_class",
  },
  {
    standard: 1,
    div: "A",
    class_id: "class1A",
  },
  {
    standard: 2,
    div: "A",
    class_id: "class2A",
  },
  {
    standard: 2,
    div: "B",
    class_id: "class2B",
  },
  {
    standard: 3,
    div: "A",
    class_id: "class3A",
  },
  {
    standard: 4,
    div: "A",
    class_id: "class4A",
  },
  {
    standard: 5,
    div: "A",
    class_id: "class5A",
  },
  {
    standard: 6,
    div: "A",
    class_id: "class6A",
  },
  {
    standard: 7,
    div: "A",
    class_id: "class7A",
  },
  {
    standard: 8,
    div: "A",
    class_id: "class8A",
  },
  {
    standard: 9,
    div: "A",
    class_id: "class9A",
  },
  {
    standard: 10,
    div: "A",
    class_id: "class10A",
  },
  {
    standard: 11,
    div: "A",
    class_id: "class11A",
  },
  {
    standard: 12,
    div: "A",
    class_id: "class12A",
  },
];

const teacherDetails = [
  {
    name: "Dummy Administrator",
    teacher_id: "SNT001", //SN = School Name Teacher
    password: "Admin001",
    mail_id: "dummyadmin@gmail.com",
    phone_number: "1234567001",
    address: "Nadiad - Petlad Rd, Highway, Changa, Gujarat 388421",
    class_id: "admin_class",
    isAdmin: true,
  },
  {
    name: "Teacher Two",
    teacher_id: "SNT002", //SN = School Name Teacher
    password: "Teacher002",
    mail_id: "teachertwo@gmail.com",
    phone_number: "1234567002",
    address: "Nadiad - Petlad Rd, Highway, Changa, Gujarat 388421",
    class_id: "class1A",
    isAdmin: false,
  },
  {
    name: "Teacher Three",
    teacher_id: "SNT003", //SN = School Name Teacher
    password: "Teacher003",
    mail_id: "teacherthree@gmail.com",
    phone_number: "1234567003",
    address: "Nadiad - Petlad Rd, Highway, Changa, Gujarat 388421",
    class_id: "class2A",
    isAdmin: false,
  },
];

const studentDetails = [
  {
    stu_id: "1A001",
    name: "Student One",
    rfid_id: ";d46279c0?e",
    parents_number: "1234567001",
    class_id: "class1A",
  },
  {
    stu_id: "1A002",
    name: "Student Two",
    rfid_id: ";70a8d840?e",
    parents_number: "1234567002",
    class_id: "class1A",
  },
];

const seedClass = async () => {
  const det = await prisma.class_detail.createMany({
    data: classDetails,
  });
  console.log(det);
};

const createTeacher = async (data) => {
  bcrypt.hash(data.password, saltRounds, async function (err, hash) {
    // Store hash in your password DB.
    console.log("Hash Psas: ", hash);

    if (hash) {
      const user = await prisma.teacher_detail.create({
        data: {
          name: data.name,
          teacher_id: data.teacher_id,
          password: hash,
          mail_id: data.mail_id,
          phone_number: data.phone_number,
          address: data.address,
          class_id: data.class_id,
          isAdmin: data.isAdmin,
        },
      });
      console.log(user.teacher_id);
      return user.teacher_id;
    }
    console.log(data.teacher_id, ": ", err);
    return err;
  });
};

const seedTeachers = () => {
  for (var i = 0; i < teacherDetails.length; i++) {
    console.log(i);
    createTeacher(teacherDetails[i]);
  }
};

const seedStudents = async () => {
  const user = await prisma.student_detail.createMany({
    data: studentDetails,
  });

  console.log(user);
};

// seedClass().then(() => {
//   seedTeachers();
//   seedStudents();
// });
