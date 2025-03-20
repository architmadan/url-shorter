const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");
const srouter = express.Router();

srouter.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

srouter.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

srouter.get("/signup", async (req, res) => {
  return res.render("signup");
});

srouter.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = srouter;
