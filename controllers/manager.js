const ManagerRepo = require("../models/manager");
const validator = require("../utilities/validator");
const helper = require("../utilities/helpers");
const { setForManger } = require("../services/auth");
const bcrypt = require("bcryptjs");


async function signup(req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    if (
      validator.ValidateName(req.body.name) &&
      validator.ValidateEmail(req.body.email) &&
      validator.ValidatedPassword(req.body.password) &&
      validator.ValidatePhoneNo(req.body.phoneNo) &&
      validator.ValidateGender(req.body.gender)
    ) {
      const Id = await helper.generateManagerId();
      const manager = await ManagerRepo.create({
        id: Id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        gender: req.body.gender,
      });
      res.status(201).json({
        status: "success",
        data: {
          manager,
        },
      });
    } else if (!validator.ValidateName(req.body.name)) {
      res.status(400).json({
        status: "error",
        results: "Enter valid Name",
      });
    } else if (!validator.ValidateEmail(req.body.email)) {
      res.status(400).json({
        status: "error",
        results: "Email should be in proper format",
      });
    } else if (!validator.ValidatedPassword(req.body.password)) {
      res.status(400).json({
        status: "error",
        results: "Password should be atleast 6 character .",
      });
    } else if (!validator.ValidatePhoneNo(req.body.phoneNo)) {
      res.status(400).json({
        status: "error",
        results: "Phone number has 10 length",
      });
    } else if (!validator.ValidateGender(req.body.gender)) {
      res.status(400).json({
        status: "error",
        results: "Gender should be [male, female, others] only ",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await ManagerRepo.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found.. Please check and try again!");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Password is inccorect");
    }

    // const token = jwt.sign(
    //   {
    //     _id: user._id,
    //     email: user.email,
    //     name:user.name
    //   },
    //   secret
    // );

    const token = setForManger(user);

    // res.cookie("token", token);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send("Something went wrong..",err.message);
  }
}

module.exports = {
  signup,
  login,
};
