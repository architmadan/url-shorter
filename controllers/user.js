const { v4: uuidv4 } = require("uuid");
const USER = require("../models/user");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await USER.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email: email, password: password });
  if (!user) {
    res.render("login", {
      error: "Invalid username or password.",
    });
  }
  //const sessionId = uuidv4(); STATEFUL AUTH
  //setUser(sessionId, user);
  const token = setUser(user);
  res.cookie("token", token); //2nd way to implement sending token to user via json
  //return res.json({ token });
  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
