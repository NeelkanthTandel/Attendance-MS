const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createTeacher } = require("./modules/dblib");
const saltRounds = 10;

const classDetails = [
  // {
  //   standard: 0,
  //   div: "-",
  //   class_id: "admin_class",
  // },
  // {
  //   standard: 1,
  //   div: "A",
  //   class_id: "class1A",
  // },
  // {
  //   standard: 2,
  //   div: "A",
  //   class_id: "class2A",
  // },
  // {
  //   standard: 2,
  //   div: "B",
  //   class_id: "class2B",
  // },
  // {
  //   standard: 3,
  //   div: "A",
  //   class_id: "class3A",
  // },
  // {
  //   standard: 4,
  //   div: "A",
  //   class_id: "class4A",
  // },
  // {
  //   standard: 5,
  //   div: "A",
  //   class_id: "class5A",
  // },
  // {
  //   standard: 6,
  //   div: "A",
  //   class_id: "class6A",
  // },
  // {
  //   standard: 7,
  //   div: "A",
  //   class_id: "class7A",
  // },
  // {
  //   standard: 8,
  //   div: "A",
  //   class_id: "class8A",
  // },
  // {
  //   standard: 9,
  //   div: "A",
  //   class_id: "class9A",
  // },
  // {
  //   standard: 10,
  //   div: "A",
  //   class_id: "class10A",
  // },
  // {
  //   standard: 11,
  //   div: "A",
  //   class_id: "class11A",
  // },
  // {
  //   standard: 12,
  //   div: "A",
  //   class_id: "class12A",
  // },
  // {
  //   standard: 1,
  //   div: "B",
  //   class_id: "class1B",
  // },
  // {
  //   standard: 3,
  //   div: "B",
  //   class_id: "class3B",
  // },
  // {
  //   standard: 4,
  //   div: "B",
  //   class_id: "class4B",
  // },
  // {
  //   standard: 5,
  //   div: "B",
  //   class_id: "class5B",
  // },
  // {
  //   standard: 6,
  //   div: "B",
  //   class_id: "class6B",
  // },
  // {
  //   standard: 7,
  //   div: "B",
  //   class_id: "class7B",
  // },
  // {
  //   standard: 8,
  //   div: "B",
  //   class_id: "class8B",
  // },
  // {
  //   standard: 9,
  //   div: "B",
  //   class_id: "class9B",
  // },
  // {
  //   standard: 10,
  //   div: "B",
  //   class_id: "class10B",
  // },
  // {
  //   standard: 11,
  //   div: "B",
  //   class_id: "class11B",
  // },
  // {
  //   standard: 12,
  //   div: "B",
  //   class_id: "class12B",
  // },
  // {
  //   standard: 12,
  //   div: "C",
  //   class_id: "class12C",
  // },
];

const teacherDetails = [
  // {
  //   name: "Dummy Administrator",
  //   teacher_id: "SNT001", //SN = School Name Teacher
  //   password: "Admin001",
  //   mail_id: "dummyadmin@gmail.com",
  //   phone_number: "1234567001",
  //   address: "Nadiad - Petlad Rd, Highway, Changa, Gujarat 388421",
  //   class_id: "admin_class",
  //   isAdmin: true,
  // },
  // {
  //   name: "Teacher Two",
  //   teacher_id: "SNT002", //SN = School Name Teacher
  //   password: "Teacher002",
  //   mail_id: "teachertwo@gmail.com",
  //   phone_number: "1234567002",
  //   address: "Nadiad - Petlad Rd, Highway, Changa, Gujarat 388421",
  //   class_id: "class1A",
  //   isAdmin: false,
  // },
  // {
  //   name: "Teacher Three",
  //   teacher_id: "SNT003", //SN = School Name Teacher
  //   password: "Teacher003",
  //   mail_id: "teacherthree@gmail.com",
  //   phone_number: "1234567003",
  //   address: "Nadiad - Petlad Rd, Highway, Changa, Gujarat 388421",
  //   class_id: "class2A",
  //   isAdmin: false,
  // },
  {
    name: "Teacher Four",
    teacher_id: "SNT004", //SN = School Name Teacher
    password: "Teacher004",
    mail_id: "teacherfour@gmail.com",
    phone_number: "1234567004",
    address: "Nadiad - Petlad Rd, Highway, Changa, Gujarat 388421",
    class_id: "class3A",
    isAdmin: false,
  },
];

const studentDetails = [
  // {
  //   stu_id: "1A001",
  //   name: "Student One",
  //   rfid_id: ";d46279c0?e",
  //   parents_number: "1234567001",
  //   class_id: "class1A",
  // },
  // {
  //   stu_id: "1A002",
  //   name: "Student Two",
  //   rfid_id: ";70a8d840?e",
  //   parents_number: "1234567002",
  //   class_id: "class1A",
  // },
  // {
  //   stu_id: "1A003",
  //   name: "Student Three",
  //   rfid_id: "dummy003",
  //   parents_number: "1234567003",
  //   class_id: "class1A",
  // },
  // {
  //   stu_id: "1A004",
  //   name: "Student Four",
  //   rfid_id: "dummy004",
  //   parents_number: "1234567004",
  //   class_id: "class1A",
  // },
  // {
  //   stu_id: "1A005",
  //   name: "Student Five",
  //   rfid_id: "dummy005",
  //   parents_number: "1234567005",
  //   class_id: "class1A",
  // },
  // {
  //   stu_id: "1A006",
  //   name: "Student Six",
  //   rfid_id: "dummy006",
  //   parents_number: "1234567006",
  //   class_id: "class1A",
  // },
  // {
  //   stu_id: "1A007",
  //   name: "Student Seven",
  //   rfid_id: "dummy007",
  //   parents_number: "1234567007",
  //   class_id: "class1A",
  // },
  // {
  //   stu_id: "1A008",
  //   name: "Student Eight",
  //   rfid_id: "dummy008",
  //   parents_number: "1234567008",
  //   class_id: "class1A",
  // },
  // {
  //   stu_id: "2A001",
  //   name: "Student One",
  //   rfid_id: "dummy201",
  //   parents_number: "1234567201",
  //   class_id: "class2A",
  // },
  // {
  //   stu_id: "2A002",
  //   name: "Student Two",
  //   rfid_id: "dummy202",
  //   parents_number: "1234567202",
  //   class_id: "class2A",
  // },
  // {
  //   stu_id: "2A003",
  //   name: "Student Three",
  //   rfid_id: "dummy203",
  //   parents_number: "1234567203",
  //   class_id: "class2A",
  // },
  // {
  //   stu_id: "2A004",
  //   name: "Student Four",
  //   rfid_id: "dummy204",
  //   parents_number: "1234567204",
  //   class_id: "class2A",
  // },
  // {
  //   stu_id: "2A005",
  //   name: "Student Five",
  //   rfid_id: "dummy205",
  //   parents_number: "1234567205",
  //   class_id: "class2A",
  // },
  // {
  //   stu_id: "2A006",
  //   name: "Student Six",
  //   rfid_id: "3563223488",
  //   parents_number: "1234567206",
  //   class_id: "class2A",
  // },
  // {
  //   stu_id: "2A007",
  //   name: "Student Seven",
  //   rfid_id: "3563222048",
  //   parents_number: "1234567207",
  //   class_id: "class2A",
  // },
  // {
  //   stu_id: "2A008",
  //   name: "Student Eight",
  //   rfid_id: "3563114288",
  //   parents_number: "1234567208",
  //   class_id: "class2A",
  // },
];

const seedClass = async () => {
  const det = await prisma.class_detail.createMany({
    data: classDetails,
  });
  console.log(det);
};

const createStudent = async (data) => {
  const stu = await prisma.student_detail.create({
    data,
  });
  console.log(stu.stu_id);
};

const seedTeachers = () => {
  // for (var i = 14; i < 26; i++) {
  //   let word;
  //   switch (i) {
  //     case 10:
  //       word = "ten";
  //       break;
  //     case 11:
  //       word = "eleven";
  //       break;
  //     case 12:
  //       word = "twelve";
  //       break;
  //     case 13:
  //       word = "thirteen";
  //       break;
  //     case 14:
  //       word = "fourteen";
  //       break;
  //     case 15:
  //       word = "fifteen";
  //       break;
  //     case 16:
  //       word = "sixteen";
  //       break;
  //     case 17:
  //       word = "seventeen";
  //       break;
  //     case 18:
  //       word = "eighteen";
  //       break;
  //     case 19:
  //       word = "ninety";
  //       break;
  //     case 20:
  //       word = "twenty";
  //       break;
  //     case 21:
  //       word = "twentyOne";
  //       break;
  //     case 22:
  //       word = "twentyTwo";
  //       break;
  //     case 23:
  //       word = "twentyThree";
  //       break;
  //     case 24:
  //       word = "twentyFour";
  //       break;
  //     case 25:
  //       word = "twentyFive";
  //       break;
  //     case 26:
  //       word = "twentySix";
  //       break;
  //   }
  //   const data = {
  //     name: "Teacher " + word.charAt(0).toUpperCase() + word.slice(1),
  //     teacher_id: "SNT0" + i, //SN = School Name Teacher
  //     password: "Teacher0" + i,
  //     mail_id: "teacher" + word + "@gmail.com",
  //     phone_number: "12345670" + i,
  //     address: "Nadiad - Petlad Rd, Highway, Changa, Gujarat 388421",
  //     class_id: "class" + (i - 13).toString() + "B",
  //     isAdmin: false,
  //   };
  //   // console.log(data);
  //   // createTeacher(data);
  // }

  for (var i = 0; i < teacherDetails.length; i++) {
    const data = {
      name: teacherDetails[i].name,
      teacher_id: teacherDetails[i].teacher_id, //SN = School Name Teacher
      password: teacherDetails[i].password,
      mail_id: teacherDetails[i].mail_id,
      phone_number: teacherDetails[i].phone_number,
      address: teacherDetails[i].address,
      class_id: teacherDetails[i].class_id,
      isAdmin: false,
    };
    createTeacher(data);
  }
};

// seedTeachers();

const seedStudents = async () => {
  const user = await prisma.student_detail.createMany({
    data: studentDetails,
  });

  console.log(user);
};

// seedClass();
// seedStudents();

// seedClass().then(() => {
// seedTeachers();
// seedStudents();
// });
