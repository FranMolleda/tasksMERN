const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res) => {
  //Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Extraer email y password
  const { email, password } = req.body;

  try {
    //Revisar que sea un usuario reguistrado
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User don´t exists" });
    }

    //Revisar su password
    const correctPassword = await bcryptjs.compare(password, user.password);
    if (!correctPassword) {
      return res.json({ msg: "Password incorrect" });
    }

    //Si todo es correcto pasamos el JWT
    //Cerear y firmar JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    //Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600000, //Una hora
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
