const express = require("express");
const {
  handleGenerateNewShortURL,
  handleVisitedArray,
  handleGetAnalytics,
} = require("../controllers/url");

const urlRouter = express.Router();

urlRouter.post("/", handleGenerateNewShortURL);

urlRouter.get("/:shortId", handleVisitedArray);

urlRouter.get("/analytics/:shortId", handleGetAnalytics);

module.exports = urlRouter;
