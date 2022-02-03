require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const jwtkey = process.env.JWTKEY;

module.exports = (req, res, next) => {
  console.log("in require token");
  const { authorization } = req.headers;
  //authorization === Bearer sfafsafa
  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtkey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in" });
    }
    const { teacherId } = payload;
    console.log(teacherId);

    const user = await prisma.teacher_detail.findUnique({
      where: {
        teacher_id: teacherId,
      },
    });

    // console.log(user);

    if (!user) {
      return res.status(401).send({ error: "Account must be deleted" });
    }
    req.user = user;
    next();
  });
};
