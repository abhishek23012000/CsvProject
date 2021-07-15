const File = require("../models/files");

const fs = require("fs");
const path = require("path");

module.exports.Index = async function (req, res) {
  try {
    let files = await File.find({});
    res.render("home", {
      file: files,
    });
    req.flash("success", "all data");
  } catch (err) {
    console.log(err);
  }
  
};
